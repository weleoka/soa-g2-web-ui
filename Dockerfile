# === build image
FROM node:15-alpine as build-stage
WORKDIR /home/node
COPY package*.json ./
RUN npm install
COPY ./ .
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
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
