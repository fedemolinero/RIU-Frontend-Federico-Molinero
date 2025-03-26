FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm i

RUN npm install -g @angular/cli@18.0.0

COPY . .

RUN npm run build-prod 

FROM nginx:latest 

COPY ./nginx.conf /etc/nginx/conf.d/default.conf;

COPY --from=build /app/dist/riu-hero-app/browser /usr/share/nginx/html

EXPOSE 80
