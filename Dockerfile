# docker run --rm -it -p 8100:8100 welshacademy bash
FROM node:16.13.0
WORKDIR /welshacademy
RUN npm install -g servor

COPY src/ ./src
COPY angular.json .
COPY package-lock.json .
COPY package.json .
COPY transloco.config.js .
COPY tsconfig.json .
COPY tsconfig.spec.json .
COPY tsconfig.app.json .

RUN npm ci
RUN npm run build
EXPOSE 8100
CMD ["servor", "dist/welsh-academy", "index.html", "8100"]

