# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # this will generate /app/dist

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the dist folder to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 12345
EXPOSE 12345

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
