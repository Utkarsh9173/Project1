#FROM node:lts-buster
#Build step, on a heavier linux version.

FROM node:14.15.3-buster as build
COPY . /var/app/rainbow-energy-be

WORKDIR /var/app/rainbow-energy-be
RUN npm install
RUN npm run build

#lighter server image
FROM node:14.15.3-alpine
WORKDIR /var/app/rainbow-energy-be

#Copy package.json
COPY ./package*.json ./
#Copy prebuild dist
COPY --from=build /var/app/rainbow-energy-be/dist ./dist
COPY ./locales ./locales
COPY ./mail-template ./mail-template
COPY ./swagger-doc ./swagger-doc
#Copy npm pacakges with prod flag
RUN npm install --production