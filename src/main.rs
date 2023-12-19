use rocket::fs::{FileServer, NamedFile, Options};
use rocket_governor::rocket_governor_catcher;

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate nanoid;

mod db;
mod link;
mod utils;
mod rate_limit;

#[get("/<_..>", rank = 2)]
pub(crate) async fn fallback_url() -> Option<NamedFile> {
    NamedFile::open("public/index.html").await.ok()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(db::stage())
        .attach(link::register_routes("/api"))
        .mount("/", FileServer::new("public", Options::None).rank(1))
        .mount("/", routes![fallback_url])
        .register("/", catchers![rocket_governor_catcher])
}
