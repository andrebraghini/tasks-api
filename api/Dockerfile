FROM node:16-alpine

LABEL maintainer="dedoxbr@gmail.com"

RUN addgroup -S service && \
  adduser application -S -G service

COPY ./dist/api /home/application
COPY ./api/package.json /home/application/package.json
COPY ./api/package-lock.json /home/application/package-lock.json

RUN cd /home/application && npm ci --production

RUN cd /home/application && \
  chmod -R 550 /home/application && \
  chown -R application:service /home/application

USER application
WORKDIR /home/application

EXPOSE 4000

CMD node index.js
