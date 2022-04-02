FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm cache clean --force && rm -rf node_modules && npm install

COPY . .

EXPOSE 3333

CMD ["npm", "dev"]