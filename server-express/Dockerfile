#копирует исходный код и запустите установку NPM
FROM node:16.15.1-alpine3.16 as builder
WORKDIR /usr/src/app
COPY package* ./
COPY src/ src/
RUN ["npm", "install"]
# Наше приложение работает на порту 3000 в контейнере, поэтому необходимо его разоблачить
EXPOSE 3000
RUN ["npm", "run", "dev"]

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