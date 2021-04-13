FROM node:14.16.0-alpine3.13

WORKDIR /app
RUN npm install -g serve

COPY package*.json .
RUN npm install

COPY src/ src/
COPY public/ public/
RUN npm run build

ENTRYPOINT serve -s build
