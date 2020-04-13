FROM node:lts-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN yarn install

COPY . .

EXPOSE 8080

CMD yarn start
