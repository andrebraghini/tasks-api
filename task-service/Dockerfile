FROM node:16-alpine

LABEL maintainer="dedoxbr@gmail.com"

RUN addgroup -S service && \
  adduser application -S -G service

COPY ./dist/task-service /home/application
COPY ./task-service/package.json /home/application/package.json
COPY ./task-service/package-lock.json /home/application/package-lock.json

RUN cd /home/application && npm ci --production

RUN cd /home/application && \
  chmod -R 550 /home/application && \
  chown -R application:service /home/application

USER application
WORKDIR /home/application

EXPOSE 3000

CMD npm start
