FROM node:latest

WORKDIR /mifisio/app

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
