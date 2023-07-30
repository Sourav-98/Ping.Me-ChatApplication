FROM node:latest
WORKDIR /usr/src/pingme/
COPY package*.json ./
COPY . .
EXPOSE 8080
RUN npm install
RUN npm install typescript
CMD ["npm", "run", "dev"]