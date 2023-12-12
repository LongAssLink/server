use rocket::{
    fairing::{self, AdHoc},
    Build,
};
use rocket_db_pools::Database;

#[derive(Database)]
#[database("link")]
pub struct Db(sqlx::PgPool);

async fn run_migrations(rocket: rocket::Rocket<Build>) -> fairing::Result {
    match Db::fetch(&rocket) {
        Some(db) => match sqlx::migrate!("./migrations").run(&**db).await {
            Ok(_) => Ok(rocket),
            Err(e) => {
                error!("Failed to migrate: {:?}", e);
                Err(rocket)
            }
        },
        None => Err(rocket),
    }
}

pub fn stage() -> AdHoc {
    AdHoc::on_ignite("Link Data", |rocket| async {
        rocket
            .attach(Db::init())
            .attach(AdHoc::try_on_ignite("DB Migrations", run_migrations))
        // .mount("/api/link", routes![find_link, create_link])
    })
}
