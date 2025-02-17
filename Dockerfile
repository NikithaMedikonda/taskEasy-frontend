FROM node:16-slim

WORKDIR taskEasy-frontend/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
