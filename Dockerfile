FROM node:18.0-bullseye-slim

WORKDIR /usr/src/client

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

RUN yarn build

CMD ["yarn", "start"]