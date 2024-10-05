FROM node:20.18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src .

CMD ["node", "server.js"]
