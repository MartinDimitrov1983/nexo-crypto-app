FROM node:18-alpine

WORKDIR /crypto-app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]