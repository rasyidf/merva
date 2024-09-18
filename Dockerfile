FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Define runtime image
FROM nginx:alpine AS runtime

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

RUN apk update && apk upgrade

# Copy static assets from builder stage
COPY --from=build /app/dist ./

# Copy nginx conf
COPY nginx/nginx.conf     /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 4000

# Set entrypoint
CMD ["nginx", "-g", "daemon off;"]