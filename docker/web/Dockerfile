FROM node:18-alpine

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

RUN npm run build

CMD ["npm","run", "start"]
