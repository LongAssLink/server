use rocket::{
    fairing::AdHoc,
    http::Status,
    serde::{json::Json, Deserialize, Serialize},
};
use rocket_db_pools::{sqlx, Connection};
use rocket_governor::{RocketGovernor, RocketGovernable, Method, Quota};

use crate::{
    db::Db,
    utils::*,
};

pub struct RateLimitGuard;

impl<'r> RocketGovernable<'r> for RateLimitGuard {
    fn quota(_method: Method, _route_name: &str) -> Quota {
        Quota::per_second(Self::nonzero(1u32))
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
struct Link {
    id: Option<String>,
    slug: String,
    dest: String,
    created_at: Option<String>,
    updated_at: Option<String>,
}

fn respond_with_link(status: Status, link: Link) -> (Status, Json<ApiResponse<Link>>) {
    (
        status,
        Json(ApiResponse {
            ok: true,
            data: Some(link),
            error: None,
        }),
    )
}

fn respond_with_error(status: Status, error: String) -> (Status, Json<ApiResponse<Link>>) {
    (
        status,
        Json(ApiResponse {
            ok: false,
            data: None,
            error: Some(error),
        }),
    )
}

#[get("/<slug>")]
async fn find_link(mut db: Connection<Db>, slug: &str) -> (Status, Json<ApiResponse<Link>>) {
    match sqlx::query!(
        "SELECT id, slug, dest, created_at, updated_at FROM public.links WHERE slug = $1",
        slug
    )
    .fetch_one(&mut **db)
    .await
    {
        Err(e) => respond_with_error(
            match e {
                sqlx::Error::RowNotFound => Status::NotFound,
                _ => Status::InternalServerError,
            },
            format!("{:?}", e.to_string()),
        ),
        Ok(r) => respond_with_link(
            Status::Ok,
            Link {
                id: r.id.to_string().into(),
                slug: r.slug,
                dest: r.dest,
                created_at: date_to_str(r.created_at),
                updated_at: date_to_str(r.updated_at),
            },
        ),
    }
}

#[post("/", data = "<lnk>")]
async fn create_link(
    mut db: Connection<Db>,
    mut lnk: Json<Link>,
    _limitguard: RocketGovernor<'_, RateLimitGuard>,
) -> (Status, Json<ApiResponse<Link>>) {
    lnk.slug = match lnk.slug.len() {
        0 => generate_slug(),
        _ => lnk.slug.clone(),
    };

    let existing = sqlx::query!(
        "SELECT id, slug, dest, created_at, updated_at FROM public.links WHERE dest = $1",
        lnk.dest
    )
    .fetch_one(&mut **db)
    .await
    .ok();

    if let Some(r) = existing {
        let _ = sqlx::query!(
            "UPDATE public.links SET updated_at = NOW() WHERE id = $1",
            r.id
        )
        .execute(&mut **db)
        .await;
        return respond_with_link(
            Status::Ok,
            Link {
                id: r.id.to_string().into(),
                slug: r.slug,
                dest: r.dest,
                created_at: date_to_str(r.created_at),
                updated_at: date_to_str(r.updated_at),
            },
        );
    }

    match sqlx::query!(
        "INSERT INTO public.links (slug, dest) VALUES ($1, $2) RETURNING id, slug, dest, created_at, updated_at",
        lnk.slug,
        lnk.dest
    )
    .fetch_one(&mut **db)
    .await
    {
        Err(e) => respond_with_error(
            Status::InternalServerError,
            format!("{:?}", e.to_string())
        ),
        Ok(r) => respond_with_link(Status::Created, Link {
            id: r.id.to_string().into(),
            slug: r.slug,
            dest: r.dest,
            created_at: date_to_str(r.created_at),
            updated_at: date_to_str(r.updated_at),
        })
    }
}

pub fn register_routes(base: &str) -> AdHoc {
    let url = format!("{}/link", base);
    AdHoc::on_ignite("Registering Routes", |rocket| async {
        rocket.mount(url, routes![find_link, create_link])
    })
}
