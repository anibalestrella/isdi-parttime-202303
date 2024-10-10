# Build stage
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage 
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
