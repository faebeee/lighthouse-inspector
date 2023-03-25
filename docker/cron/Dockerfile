FROM node:18-alpine

ARG NEXT_PUBLIC_MIX_PANEL_TOKEN

RUN apk --no-cache upgrade && apk add --no-cache chromium

ENV CHROME_BIN=/usr/bin/chromium-browser

ENV NEXT_PUBLIC_MIX_PANEL_TOKEN=${NEXT_PUBLIC_MIX_PANEL_TOKEN}

RUN mkdir -p /app/

WORKDIR /app/

COPY package.json package-lock.json /app/

COPY ./ /app/

RUN npm install

CMD ["npm", "run", "cron"]
