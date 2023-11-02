FROM node:20.7.0-alpine3.17@sha256:2d808029dd5a1e6a606c06a3c78fbb770f53d2603827e7fcfbc7878848749152
WORKDIR /app/
COPY --chown=node:node *.json *.js yarn.lock ./
COPY --chown=node:node public/ public/
COPY --chown=node:node src/ src/
RUN yarn install && yarn cache clean && chown -R node /app/node_modules && echo VUE_APP_HUB=http://localhost:5001 > .env
USER node
CMD ["yarn", "serve"]
