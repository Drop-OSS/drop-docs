# Building Drop OSS

## Building Drop server for other platforms

Unfortunately, we don't have the time or resources to build and debug our software for platforms other than x86-64 or arm64. However, we offer this guide as a way to get it running, at your own risk.

### Prerequisites

To compile:

- Rust (nightly)
- Node.js v20
- `pnpm` package manager
- `git` VCS
- Docker

To run:

- Docker

### Building `droplet`

`droplet` is a high-performance utility package for the Drop server. It's a `napi.rs` module, meaning it's written in Rust and then compiled to an NPM module.

Get started by cloning the `droplet` source code, and then enter the directory:

```shell
git clone https://github.com/Drop-OSS/droplet.git
```

Install the dependencies with `pnpm`:

```shell
pnpm
```

And then compile the package with the build script:

```shell
pnpm build
```

Because we're building this locally, setup the pnpm link so we can use this package while building the server:

```shell
pnpm link
```

### Building `drop`

`drop` is the self hosted server. It's a Nuxt 3 project, but depends on the `droplet` package so isn't easily transportable.

Get started by cloning the `drop` source code, and then enter the directory:

```shell
git clone https://github.com/Drop-OSS/drop.git
```

Then, link your build `droplet` package:

```shell
pnpm link "@drop-oss/droplet"
```

Then, install dependencies:

```shell
pnpm
```

Then, build the application:

```
pnpm build
```

To package it into a Docker container, remove the build commands in the provided `Dockerfile`'s build-system (`pnpm install` and `pnpm build`), and then build the Docker image:

```shell
docker build . -t drop
```

## Building drop-app (desktop companion app)

To build drop-app, run:

```shell
git clone https://github.com/Drop-OSS/drop-app.git
cd drop-app
git checkout main
pnpm
pnpm tauri build
```

If the command is successful, you can find the generated assets in: `src-tauri/target/release/bundle`. You can find the AppImage in the `appimage` folder.

If the `pnpm tauri build` command fails, you can try adding `--verbose` to get the error details.

If you get this type of error:

```
ERROR: Strip call failed: /tmp/appimage_extracted_5a27dadc81a3abf452534fdbee9c58ee/usr/bin/strip: Drop Desktop Client.AppDir/usr/lib/libSvtAv1Enc.so.3: unknown type [0x13] section `.relr.dyn'
/tmp/appimage_extracted_5a27dadc81a3abf452534fdbee9c58ee/usr/bin/strip: Unable to recognise the format of the input file `Drop Desktop Client.AppDir/usr/lib/libSvtAv1Enc.so.3'
```

Then you can run the following:

```shell
sudo ln -s /usr/lib/libavif.so.16 /usr/lib/libavif.so.15
NO_STRIP=true pnpm tauri build
```

This is a known issue in [Tauri](https://github.com/tauri-apps/tauri/issues/5781#issuecomment-1758815710).

**Note:** For Windows-specific build instructions, see the [Building drop-app on Windows](building-windows.md) page.
\*\*
