FROM node:14.10.1 AS build
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]