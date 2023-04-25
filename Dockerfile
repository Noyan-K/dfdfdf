FROM node:18.12.1 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:18.12.1-slim
EXPOSE 8000
WORKDIR /srv/backend
COPY --from=builder /app ./
CMD ["npm", "run", "start"]
