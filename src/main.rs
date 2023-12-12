#[macro_use]
extern crate rocket;

#[macro_use]
extern crate nanoid;

mod db;
mod link;
mod utils;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(db::stage())
        .attach(link::register_routes("/api"))
        .mount("/", routes![index])
}
