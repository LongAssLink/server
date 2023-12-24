// From gh/DavidGoldman
// https://github.com/rwf2/Rocket/issues/95#issuecomment-1712655211

use rocket::Data;
use rocket::Request;
use rocket::{
    figment,
    fs::FileServer,
    http::Method,
    route::{Handler, Outcome},
    Route,
};
use std::path::{Path, PathBuf};

#[derive(Debug, Clone)]
pub(crate) struct CachedFileServer {
    root: PathBuf,
    server: FileServer,
}

impl CachedFileServer {
    const DEFAULT_RANK: isize = 1;

    #[track_caller]
    pub fn from<P: AsRef<Path>>(path: P) -> Self {
        CachedFileServer {
            root: path.as_ref().into(),
            server: FileServer::from(path),
        }
    }
}

impl From<CachedFileServer> for Vec<Route> {
    fn from(server: CachedFileServer) -> Self {
        let source = figment::Source::File(server.root.clone());
        let mut route = Route::ranked(
            CachedFileServer::DEFAULT_RANK,
            Method::Get,
            "/<path..>",
            server,
        );
        route.name = Some(format!("CachedFileServer: {}", source).into());
        vec![route]
    }
}

#[async_trait::async_trait]
impl Handler for CachedFileServer {
    async fn handle<'r>(&self, req: &'r Request<'_>, data: Data<'r>) -> Outcome<'r> {
        match self.server.handle(req, data).await {
            Outcome::Success(mut resp) => {
                resp.set_raw_header("Cache-control", "max-age=31536000"); // 1 year
                Outcome::Success(resp)
            }
            i => i,
        }
    }
}
