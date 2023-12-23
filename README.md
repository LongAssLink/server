# LongAssLink - Rust-based Link Shortener

LongAssLink is a simple link shortener web application written in Rust. It uses the Rocket web framework for building the server and leverages Docker for development and deployment. The project also includes a submodule containing a React-based frontend app at `frontend/` that generates static files (output dir: `public/`) for the Rust server to serve.

## Features

- Shorten long URLs with ease
- Dockerized development environment (separate _Dockerfile_ + _compose.yaml_ for deployment)
- React-based frontend for a user-friendly interface

## Installation and Setup

### Development

1. Make sure you have Docker Compose installed.
2. Clone the repository:

   ```bash
   git clone https://github.com/LongAssLink/server.git long-ass-link
   ```

3. Navigate to the project directory:

   ```bash
   cd long-ass-link
   ```

4. Run the development environment using Docker Compose:

   ```bash
   docker-compose up
   ```

   This will start the Rust server and the React frontend.

5. Access the application at [http://localhost:9000](http://localhost:9000).

### Build new frontend bundle

The process should be explained in the `README.md` file located in the frontend submodule. But it boils down to:

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Make sure dependencies are installed:

   ```bash
   yarn
   ```

3. Run the build task:

   ```bash
   yarn build --emptyOutDir
   ```

This should replace the contents of the `public/` directory with the new frontend bundle.

### Deployment (manual for now)

1. Build the Docker image using the provided Dockerfile:

   ```bash
   docker build -t long-ass-link -f _docker/Dockerfile .
   ```

2. Push a the image to Docker Hub.
3. Update the deployment

## Configuration

The configuration for the Rocket web framework can be modified in the `Rocket.toml` file, some values like the databases are injected through environment variables in the production environment.

## Dependencies

- [Rocket](https://rocket.rs) - Web framework for Rust
- [sqlx](https://github.com/launchbadge/sqlx) - Async, pure Rust SQL crate
- [nanoid](https://crates.io/crates/nanoid) - A tiny URL-friendly unique string ID generator

## Contributing

Feel free to contribute to the development of LongAssLink! Create issues, submit pull requests, or provide suggestions.

## License

This project is licensed under the GNU General Public License (3.0 or later) - see the [LICENSE](LICENSE) file for details.
