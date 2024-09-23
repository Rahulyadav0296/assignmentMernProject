# Use the official Node.js image as the base image
FROM node:18.20.4

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["nodemon", "start"]
