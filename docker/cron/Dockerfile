FROM node:18-alpine

RUN apk --no-cache upgrade && apk add --no-cache chromium
ENV CHROME_BIN=/usr/bin/chromium-browser

RUN mkdir -p /app/

WORKDIR /app/

COPY package.json package-lock.json /app/

COPY ./ /app/

ENV APP_NAME = 'cron'

RUN npm install

RUN crontab -l | { cat; echo "* * * * * cd /app/ && npm run cli:task:beacon"; } | crontab -
RUN crontab -l | { cat; echo "* */12 * * * cd /app/ && npm run cli:task:cleanup"; } | crontab -
RUN crontab -l | { cat; echo "* */4 * * * cd /app/ && npm run cli:task:audit"; } | crontab -

ENTRYPOINT ["crond", "-f"]
