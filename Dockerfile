FROM node:18.12.1 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:18.12.1-slim
EXPOSE 8000
RUN apt-get update && apt-get install -y fontconfig --no-install-recommends && rm -rf /var/lib/apt/lists/*
WORKDIR /srv/backend
COPY --from=builder /app ./
CMD ["npm", "run", "start"]
