FROM node:18-alpine3.16

ARG GH_ACCESS_TOKEN

RUN apk --no-cache upgrade
RUN apk add --no-cache openssl
RUN apk add --no-cache chromium
ENV CHROME_BIN=/usr/bin/chromium-browser

RUN mkdir -p /app/

WORKDIR /app/

COPY package.json package-lock.json /app/

COPY ./ /app/

RUN npm install

ENV NODE_ENV=production
ENV NEXTAUTH_SECRET=***
ENV DATABASE_URL=***
ENV MINIO_HOST=***
ENV MINIO_BUCKET=***
ENV MINIO_ACCESS_KEY=***
ENV MINIO_SECRET_KEY=***
ENV GH_ACCESS_TOKEN=${GH_ACCESS_TOKEN}

RUN npm run build

CMD ["npm","run", "start"]
