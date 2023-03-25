FROM node:18-alpine

RUN apk --no-cache upgrade && apk add --no-cache chromium

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV GH_ACCESS_TOKEN=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

RUN mkdir -p /app/

WORKDIR /app/

COPY package.json package-lock.json /app/

COPY ./ /app/

RUN npm install

CMD ["npm", "run", "cron"]
