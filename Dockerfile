FROM node:18.0-bullseye-slim

WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "start"]