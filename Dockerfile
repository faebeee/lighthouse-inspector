FROM node:18-alpine

RUN mkdir -p /app/

WORKDIR /app/

COPY package.json package-lock.json /app/

COPY ./ /app/

RUN npm install

ENV NODE_ENV=production

RUN npm run build

CMD ["npm","run", "start"]
