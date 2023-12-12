use rocket::{
    fairing::AdHoc,
    http::Status,
    serde::{json::Json, Deserialize, Serialize},
};
use rocket_db_pools::{sqlx, Connection};

use crate::{db::Db, utils::*};

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
struct Link {
    id: Option<String>,
    slug: String,
    dest: String,
    created_at: Option<String>,
    updated_at: Option<String>,
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
        Err(e) => match e {
            sqlx::Error::RowNotFound => (
                Status::NotFound,
                Json(ApiResponse {
                    ok: false,
                    data: None,
                    error: Some("Link not found".into()),
                }),
            ),
            _ => (
                Status::InternalServerError,
                Json(ApiResponse {
                    ok: false,
                    data: None,
                    error: Some(format!("{:?}", e.to_string())),
                }),
            ),
        },
        Ok(r) => (
            Status::Ok,
            Json(ApiResponse {
                ok: true,
                data: Some(Link {
                    id: r.id.to_string().into(),
                    slug: r.slug,
                    dest: r.dest,
                    created_at: date_to_str(r.created_at),
                    updated_at: date_to_str(r.updated_at),
                }),
                error: None,
            }),
        ),
    }
}

#[post("/", data = "<lnk>")]
async fn create_link(
    mut db: Connection<Db>,
    mut lnk: Json<Link>,
) -> (Status, Json<ApiResponse<Link>>) {
    lnk.slug = match lnk.slug.len() {
        0 => generate_slug(),
        _ => lnk.slug.clone(),
    };
    match sqlx::query!(
        "INSERT INTO public.links (slug, dest) VALUES ($1, $2) RETURNING id, slug, dest, created_at, updated_at",
        lnk.slug,
        lnk.dest
    )
    .fetch_one(&mut **db)
    .await
    {
        Err(e) => (
            Status::InternalServerError,
            Json(ApiResponse {
                ok: false,
                data: None,
                error: Some(format!("{:?}", e.to_string())),
            }),
        ),
        Ok(r) => (
            Status::Ok,
            Json(ApiResponse {
                ok: true,
                data: Some(Link {
                    id: r.id.to_string().into(),
                    slug: r.slug,
                    dest: r.dest,
                    created_at: date_to_str(r.created_at),
                    updated_at: date_to_str(r.updated_at),
                }),
                error: None
            })
        )
    }
}

pub fn register_routes(base: &str) -> AdHoc {
    let url = format!("{}/link", base);
    AdHoc::on_ignite("Registering Routes", |rocket| async {
        rocket.mount(url, routes![find_link, create_link])
    })
}
