# Building drop-app on Windows

## Prerequisites

To compile drop-app on Windows, you'll need:

- Node.js v22
- `yarn` (v1/legacy) package manager
- `git` VCS
- Rust (stable)
- Microsoft Visual Studio Build Tools or Visual Studio Community
- Windows 10/11

## Installing Node.js with Node Version Manager (nvm-windows)

We recommend using Node Version Manager for Windows to easily switch between Node.js versions.

### 1. Install nvm-windows

1. **Download nvm-windows:**
   - Go to [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
   - Download the latest `nvm-setup.exe` file
   - Run the installer as Administrator

2. **Verify installation:**
   ```shell
   nvm version
   ```

### 2. Install Node.js v22

```shell
nvm install 22.18.0
nvm use 22.18.0
```

### 3. Verify Node.js installation

```shell
node --version
npm --version
```

### 4. Install yarn

```shell
npm install -g yarn
yarn --version
```

## Installing Rust

### 1. Download Rust installer

1. **Visit the official Rust website:**
   - Go to [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)
   - Click "Download rustup-init.exe (64-bit)"

2. **Run the installer:**
   - Execute the downloaded `rustup-init.exe` file
   - Follow the installation prompts
   - Choose option 1 for default installation

### 2. Verify Rust installation

Open a new Command Prompt or PowerShell window and run:

```shell
rustc --version
cargo --version
```

### 3. Switch to nightly version

```shell
rustup toolchain install nightly
rustup default nightly
```

### 4. Verify nightly installation

```shell
rustc --version
cargo --version
```

### 5. Update Rust (if needed)

```shell
rustup update
```

## Building drop-app

Now that you have all prerequisites installed, you can build drop-app:

```shell
git clone https://github.com/Drop-OSS/drop-app.git
cd drop-app
git checkout develop
yarn
yarn tauri build
```

**Important:** Make sure to use the `develop` branch for the latest features and fixes.

If the command is successful, you can find the generated assets in: `src-tauri/target/release/bundle`. You can find the Windows installer in the `msi` folder.

If the `yarn tauri build` command fails, you can try adding `--verbose` to get the error details.

## Development Mode

For live development with real-time updates, use the development mode:

```shell
yarn tauri dev
```

This will start the application in development mode with hot reloading, allowing you to see changes immediately as you modify the code. The app will automatically restart when you save changes to your rust files.

## Troubleshooting

### Common Issues

If you encounter build errors, try the following:

1. **Ensure Rust is properly installed:**
   ```shell
   rustc --version
   cargo --version
   ```

2. **Install Visual Studio Build Tools:**
   - Download and install [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
   - Make sure to include the "C++ build tools" workload
   - Restart your terminal after installation

3. **Verify Node.js version:**
   ```shell
   node --version
   nvm list
   nvm use 22.18.0
   ```

4. **Set up environment variables:**
   - Ensure `PATH` includes Rust and Node.js
   - Set `RUST_BACKTRACE=1` for detailed error messages
   - Restart your terminal after installing Rust

5. **Clean and rebuild:**
   ```shell
   yarn clean
   yarn
   yarn tauri build
   ```

### Windows-Specific Issues

1. **PowerShell execution policy:**
   If you get execution policy errors, run PowerShell as Administrator and execute:
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

2. **Long path issues:**
   - Enable long path support in Windows Registry
   - Or clone the repository to a shorter path (e.g., `C:\drop-app`)

3. **Antivirus interference:**
   - Temporarily disable antivirus during build
   - Add the project directory to antivirus exclusions

**Note:** This page provides Windows-specific build instructions for drop-app. For general building information, see the [Building Drop OSS](building.md) page. 