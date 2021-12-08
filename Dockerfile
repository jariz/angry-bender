FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production
COPY . .

EXPOSE 5454
CMD [ "node", "index.mjs" ]