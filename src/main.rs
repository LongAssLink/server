use rocket_governor::rocket_governor_catcher;

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate nanoid;

mod cached_fs;
mod db;
mod link;
mod rate_limit;
mod utils;
mod react_router;


#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(db::stage())
        .attach(link::register_routes("/api"))
        .mount("/", cached_fs::CachedFileServer::from("public"))
        .mount("/", routes![react_router::fallback_to_index])
        .register("/", catchers![rocket_governor_catcher])
}
