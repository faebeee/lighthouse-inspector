FROM lighthouse-inspector/web

COPY package.json package-lock.json /app/

COPY ./ /app/

RUN npm install
ENV NODE_ENV=production

CMD ["npm","run", "cron"]
