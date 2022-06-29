#копирует исходный код и запустите установку NPM
FROM node:alpine as builder

RUN apk update
RUN apk add nano mc
#\
#    && apk add --update bash \
#    && apk add --update npm \
#    && apk add --no-cache --purge -uU redis \
#    && apk add git \
#    && apk add bash-completion

WORKDIR /usr/src/app
COPY package* ./
COPY src/ src/
COPY .env ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
RUN ["npm", "install", "-g", "npm@latest"]
RUN ["npm", "install"]

CMD ["npm", "run", "dev"]


# Lints Code
#FROM node:16.15.1-alpine3.16 as linting
#WORKDIR /usr/src/app
#COPY — from=builder /usr/src/app/src .
#RUN ["npm", "eslint"]

# run the static code analyzer
#FROM node:16.15.1-alpine3.16 as sonarqube
#COPY — from=builder /usr/src/app/src /root/src
#WORKDIR /root/src/
#RUN ["npm", "sonar"]