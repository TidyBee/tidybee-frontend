FROM node:20.7.0-alpine3.17@sha256:2d808029dd5a1e6a606c06a3c78fbb770f53d2603827e7fcfbc7878848749152
WORKDIR /app/
COPY *.json *.js yarn.lock ./
COPY public/ public/
COPY src/ src/
RUN yarn install && echo VUE_APP_HUB=https://localhost:5001/ > .env
CMD ["yarn", "serve"]
