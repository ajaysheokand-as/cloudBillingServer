FROM node:latest
RUN npm install -g nodemon
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run","dev" ]