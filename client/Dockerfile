FROM node:12

ARG REACT_APP_API_HOST

ENV REACT_APP_API_HOST=$REACT_APP_API_HOST

WORKDIR /client

RUN npm install -g serve

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["serve", "-s", "build"]
