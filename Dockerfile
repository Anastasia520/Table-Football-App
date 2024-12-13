# Use a multi-stage build to create separate images for client and server

# Stage 1: Build the client
FROM node:17.4.0 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build the server
FROM node:17.4.0 AS server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Stage 3: Create the final image
FROM node:17.4.0
WORKDIR /app
COPY --from=client-build /app/client/dist ./frontend
COPY --from=server-build /app/server ./
RUN npm install --production

EXPOSE 8030
CMD ["node", "/app/index.js"]
