# lighthouse-inspector
Tool for lighthouse audits to monitor your pages

This uses a `postgres` database and a `minio` asset bucket.

## Dashboard
![Overview](./doc/overview.png)

## Dev environment
Start the `minio` and `postgres` container with

- `docker-compose up database`
- `docker-compose up minio`
- `npx prisma migrate dev`
- Go to localhost:9001 and create a new bucket and add the credentials to the env (see below)
- `npm run build`
- `npm run start`


## Env variables

```dotenv
DATABASE_URL="postgresql://*:*@localhost:5432/lighthouse-inspector"
MINIO_HOST=localhost
MINIO_BUCKET=lighthouse-report
MINIO_ACCESS_KEY=***
MINIO_SECRET_KEY=***
```

## THEME config
Set the env var `NEXT_PUBLIC_THEME_MODE` to `dark` or `light`
