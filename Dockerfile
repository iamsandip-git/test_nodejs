FROM node:14 AS node_dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --production

FROM node:14-slim
WORKDIR /app
COPY . .
COPY --from=node_dependencies /app/node_modules/ ./node_modules/
EXPOSE 3000
CMD ["node", "app.js"]
