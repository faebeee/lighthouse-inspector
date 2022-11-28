FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8081
RUN npm run build
CMD [ "npm", "run", "start"]
