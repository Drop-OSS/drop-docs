# Quickstart

HELLOOOOOOOOOOOOOOOOO

This guide quickly runs through how to get set up with Drop in about five minutes, depending on your experience.

## Setting up the instance

The easiest way to get Drop running is using our pre-built Docker container.

```yaml compose.yaml
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
    image: ghcr.io/drop-oss/drop:nightly
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
```

**The main things in this `compose.yaml` is the volumes attached to the `drop` service:**

1. `./library` is where you will put your games to be imported into Drop. See '[Structuring your library](../library.md#structuring-your-library)' once you're set up.
2. `./data` is where Drop will store anything that's using the default file-system backed storage system. Typically, these are objects.

**In addition, configure your chosen metadata provider:**

- [GiantBomb](../metadata/giantbomb.md)
- [IGDB](../metadata/igdb.md)
- [PCGamingWiki](../metadata/pcgamingwiki.md)

:::tip
If you want to, you can generate a more secure PostgreSQL username & password.
:::

:::warning
For security reasons, the Drop server and client's times need to be within 30 seconds of each other, otherwise authorization will fail.
:::

Once your instance is running, it will log a URL that takes you to the setup wizard. You can use it to create an admin account, and create your first library source. 

## Setting up a client

To set up a client, your Drop instance will have to be accessible from it. See [Exposing your instance](./exposing.md) for information on how to do that.

First, download the latest client for your platform from [the GitHub releases page](https://github.com/Drop-OSS/drop-app/releases). Then, install it for your platform. If we don't have a binary available for your platform, please create an issue on [the Drop app repository](https://github.com/Drop-OSS/drop-app) and we'll investigate it.

Once installed, open the Drop app for the first time. There is an automated wizard that'll walk you through the steps of signing into your Drop instance.
