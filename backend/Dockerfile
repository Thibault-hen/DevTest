# Dockerfile dans packages/backend
FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

COPY . .

RUN pnpm install

CMD ["pnpm", "start"]