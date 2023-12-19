use rocket::serde::{Deserialize, Serialize};
use time::format_description::well_known::Iso8601;
use time::PrimitiveDateTime;

pub(crate) fn date_to_str(d: Option<PrimitiveDateTime>) -> Option<String> {
    d.map(|d| d.format(&Iso8601::DATE_TIME).ok()).flatten()
}

pub(crate) fn generate_slug() -> String {
    nanoid!(7)
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
pub(crate) struct ApiResponse<T> {
    pub ok: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}
