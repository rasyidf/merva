# build stage
FROM oven/bun:1.1.29-alpine AS build

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# deploy stage
FROM nginx:1.27.1-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
