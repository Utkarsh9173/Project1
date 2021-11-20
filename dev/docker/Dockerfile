#FROM node:lts-buster
# Install node dependencies and sync folders

FROM node:14.15.3-buster as build
COPY . /var/app/rainbow-energy-be

WORKDIR /var/app/rainbow-energy-be
RUN npm install