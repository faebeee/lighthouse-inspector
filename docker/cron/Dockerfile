FROM node:18-alpine


RUN apk --no-cache upgrade && apk add --no-cache chromium

ENV CHROME_BIN=/usr/bin/chromium-browser


RUN mkdir -p /app/

WORKDIR /app/

COPY package.json package-lock.json /app/

COPY ./ /app/

RUN npm install

CMD ["npm", "run", "cron"]
