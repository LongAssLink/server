use rocket::{fs::NamedFile, http};

#[derive(Responder)]
#[response(content_type = "text/html")]
pub(crate) struct FileWithCacheHeader {
    pub file: Option<NamedFile>,
    pub cache_control: http::Header<'static>,
}

impl FileWithCacheHeader {
    fn new(file: Option<NamedFile>, cache_control: http::Header<'static>) -> Self {
        Self {
            file,
            cache_control,
        }
    }
}

#[get("/<_..>", rank = 2)]
pub async fn fallback_to_index() -> FileWithCacheHeader {
    FileWithCacheHeader::new(
        NamedFile::open("public/index.html").await.ok(),
        http::Header::new("Cache-Control", "max-age=86400"),
    )
}
