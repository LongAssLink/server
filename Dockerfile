FROM lukemathwalker/cargo-chef AS chef
WORKDIR /app

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder 
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --recipe-path recipe.json
COPY . .
RUN cargo build --target-dir target

FROM debian:stable-slim AS runtime

WORKDIR /app
COPY --from=builder /app/target/debug/long-ass-link .
COPY --from=builder /app/Rocket.toml .
ENTRYPOINT ["/app/long-ass-link"]
