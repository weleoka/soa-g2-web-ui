# === build image
FROM node:15-alpine as build-stage
WORKDIR /home/node
COPY package*.json ./
RUN npm install
COPY ./ .
# Set the domain for API calls
ENV VUE_APP_API_URL=http://localhost:9997/api
# build the project into /home/node/dist
RUN npm run build


# === Production image
FROM nginx:alpine as production-stage
# An nginx configuration
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy compiled Vue app from the build-stage container
COPY --from=build-stage /home/node/dist /usr/share/nginx/html
# This env var is probably only needed in build stage for webpak to make the API routes.
ENV VUE_APP_API_URL=http://localhost:9997/api
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
