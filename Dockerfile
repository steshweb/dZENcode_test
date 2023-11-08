FROM node

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential g++ git python libvips libvips-dev libvips-tools

COPY package*.json ./
RUN npm install
RUN npm install --arch=x64 --platform=linux sharp

COPY .env ./
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]

