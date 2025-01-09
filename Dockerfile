FROM node:20.7.0-alpine3.17@sha256:2d808029dd5a1e6a606c06a3c78fbb770f53d2603827e7fcfbc7878848749152 as build-stage
WORKDIR /build
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.4-alpine3.18@sha256:6a2f8b28e45c4adea04ec207a251fd4a2df03ddc930f782af51e315ebc76e9a9 as production-stage
WORKDIR /app
LABEL org.opencontainers.image.source=https://github.com/TidyBee/tidybee-frontend
COPY --from=build-stage /build/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
