FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y postgis postgresql-15-postgis-3

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
