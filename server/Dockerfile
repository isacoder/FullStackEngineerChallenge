FROM node:12

WORKDIR /api

COPY package.json .

RUN npm install

COPY ./src src
COPY knexfile.js .

RUN npm run build

EXPOSE 8000

CMD ["node", "./dist/server.js"]
