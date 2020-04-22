FROM node:14-alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY .env .
COPY . .

RUN yarn install

EXPOSE 3000

CMD yarn start
