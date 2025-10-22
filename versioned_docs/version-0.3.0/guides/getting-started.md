# Getting Started

This comprehensive guide walks you through the complete setup process for Drop, from initial deployment to configuring your library and metadata providers.

## Prerequisites

Before starting, ensure you have:

- Docker and Docker Compose installed
- A machine with at least 4GB RAM and 10GB free disk space
- Network access for downloading game metadata

## Step 1: Deploy Drop Server

### Option A: Docker Compose (Recommended)

Create a `compose.yaml` file in your desired directory:

```yaml
services:
  postgres:
    image: postgres:14-alpine
    ports:
      - 5432:5432
    healthcheck:
      test: pg_isready -d drop -U drop
      interval: 30s
      timeout: 60s
      retries: 5
      start_period: 10s
    volumes:
      - ./db:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=drop
      - POSTGRES_USER=drop
      - POSTGRES_DB=drop
  drop:
    image: ghcr.io/drop-oss/drop:latest
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - 3000:3000
    volumes:
      - ./library:/library
      - ./data:/data
    environment:
      - DATABASE_URL=postgres://drop:drop@postgres:5432/drop
      - EXTERNAL_URL=http://localhost:3000
```

**Important volumes:**

- `./library`: Where you'll place your games for import
- `./data`: Where Drop stores metadata and objects

Start the services:

```bash
docker-compose up -d
```

### Option B: Manual Installation

For advanced users, see the [Building Drop OSS](../advanced/building.md) guide.

## Step 2: Extract Setup Key and Link from Server Logs

After starting the server, you need to extract the setup key and link from the logs:

```bash
# View the logs to find the setup key and link
docker-compose logs drop
```

Look for lines similar to:

```
Setup URL: http://localhost:3000/setup?key=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

**Copy both the setup key and the setup URL** - you'll need them for the next step.

:::tip
If you can't find the setup key or URL, restart the container and check the logs again:

```bash
docker-compose restart drop
docker-compose logs drop
```

:::

## Step 3: Configure Metadata Providers

Drop can _optionally_ import metadata from external sources for your library. If no metadata providers are set up and accessible, you'll have to import games without metadata and write it manually.

### GiantBomb (Recommended for beginners)

1. **Create account:** Visit [GiantBomb's signup page](https://www.giantbomb.com/login-signup/)
2. **Get API key:** Go to [GiantBomb API page](https://www.giantbomb.com/api/) and copy your key
3. **Add to environment:** Add `GIANT_BOMB_API_KEY=your_key_here` to your `compose.yaml`

For detailed instructions, see [GiantBomb Configuration](../metadata/giantbomb.md).

### IGDB

1. **Follow setup guide:** Visit [IGDB API documentation](https://api-docs.igdb.com/#getting-started)
2. **Get credentials:** You'll need both `IGDB_CLIENT_ID` and `IGDB_CLIENT_SECRET`
3. **Add to environment:** Add both variables to your `compose.yaml`

For detailed instructions, see [IGDB Configuration](../metadata/igdb.md).

### PCGamingWiki

PCGamingWiki requires no additional setup and is automatically enabled, if accessible.

For more information, see [PCGamingWiki Configuration](../metadata/pcgamingwiki.md).

## Step 4: Access the Setup Wizard

1. **Open your browser** and navigate to the setup URL you copied from the logs
2. **The setup key will be automatically included** in the URL
3. **Create your admin account** with a secure username and password

:::warning
Keep your admin credentials secure - you'll need them to manage your Drop instance.
:::

## Step 5: Configure Your Library

### Understanding Drop's Library Structure

Drop supports two library formats:

#### Drop-style (Recommended)

```
/library/
  MyGame/
    version-1/
      game.exe
      data/
    version-2/
      game.exe
      data/
  AnotherGame/
    version1.zip
```

#### Flat-style (Compatibility)

```
/library/
  MyGame/
    game.exe
    data/
  AnotherGame.zip
```

For detailed information, see [Library Sources](../library.md).

### Setting Up Your Library Source

1. **In the admin interface**, go to "Library Sources"
2. **Click "Create source"**
3. **Configure your library source:**
   - **Name:** Enter a descriptive name for your source (e.g., "My Game Library")
   - **Type:** Choose from:
     - **Filesystem:** Imports games from a path on disk. Requires version-based folder structure, and supports archived games. Use this for new Drop-style libraries.
     - **FlatFilesystem:** Imports games from a path on disk, but without a separate version subfolder. Useful when migrating an existing library to Drop.
   - **Path:** Enter the path to your game library in your docker container (e.g., `/library`)
4. **Save the configuration**

## Step 6: Import Your Games

### Importing Game Metadata

1. **Navigate to your library** in the admin interface
2. **For each game folder**, click "Import Game"
3. **Search for your game** using the metadata provider
4. **Select the correct game** from the search results
5. **Confirm the import** - this links the folder to game metadata

:::tip
Game metadata import only happens once per game. This pulls in descriptions, images, and other metadata.
:::

### Importing Game Versions

1. **For each version folder/file**, click "Import Version"
2. **Wait for processing** - Drop will scan all files and generate checksums
3. **Review the import** - check file count and size

:::tip
Version imports happen for each update. This generates the data clients need to download games.
:::

## Step 7: Set Up Client Access

### Exposing Your Instance

For clients to connect, your Drop instance needs to be accessible:

#### Local Network Access

- **Find your server's IP address**
- **Update `EXTERNAL_URL`** in your `compose.yaml`:

  ```yaml
  environment:
    - EXTERNAL_URL=http://[your-drop-server-ip]:3000
  ```

- **Restart the container:**

  ```bash
  docker-compose down && docker-compose up -d
  ```

For advanced exposure options, see [Exposing Your Instance](exposing.md).

### Installing Drop Client

1. **Download the client** from [https://droposs.org/download](https://droposs.org/download)
2. **Install for your platform**
3. **Open the client** and follow the connection wizard
4. **Enter your server URL** (e.g., `http://[your-drop-server-ip]:3000`)
5. **Sign in** with your admin credentials

## Step 8: Advanced Configuration

### User Management

- **Create additional users** in the admin interface
- **Set up authentication** - see [Authentication](../authentication/cli) for OIDC options
- **Manage permissions** for different user roles

### Library Management

- **Add multiple library sources** to combine different game collections
- **Configure version deltas** for efficient storage - see [Library Sources](../library.md#version-deltas--ordering)
- **Set up automatic imports** for new games

### Troubleshooting

If you encounter issues:

1. **Check server logs:**

   ```bash
   docker-compose logs drop
   ```

2. **Verify metadata provider configuration**
3. **Check file permissions** on your library directory
4. **Review the troubleshooting guides:**
   - [Server Troubleshooting](server-troubleshooting.md)
   - [Client Troubleshooting](client-troubleshooting.md)

## Next Steps

- **Explore the admin interface** to customize your setup
- **Add more games** to your library
- **Configure additional metadata providers** for better game information
- **Join the community** for support and feature requests

For detailed information on any topic, refer to the specific documentation pages linked throughout this guide.
