FROM node:14-alpine

RUN mkdir -p /app/

WORKDIR /app/

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser
ENV GOOGLE_CHROME_BIN /usr/bin/chromium-browser

COPY package.json yarn.lock /app/

COPY ./ /app/

RUN yarn install

ENV NODE_ENV=production
RUN npm run prisma:generate
RUN npm run build

CMD ["npm", "run", "start"]
