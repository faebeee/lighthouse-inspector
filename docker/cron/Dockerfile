FROM node:18-alpine3.16

RUN apk --no-cache upgrade
RUN apk add --no-cache openssl
RUN apk add --no-cache chromium
ENV CHROME_BIN=/usr/bin/chromium-browser

RUN mkdir -p /app/

WORKDIR /app/

COPY package.json package-lock.json /app/

COPY ./ /app/

ENV APP_NAME = 'cron'

RUN npm install

RUN #crontab -l | { cat; echo "* * * * * cd /app/ && npm run cli:task:beacon"; } | crontab -
RUN crontab -l | { cat; echo "0 */12 * * * cd /app/ && npm run cli:task:cleanup"; } | crontab -
RUN crontab -l | { cat; echo "0 * * * * cd /app/ && npm run cli:task:audit"; } | crontab -

ENTRYPOINT ["crond", "-f"]
