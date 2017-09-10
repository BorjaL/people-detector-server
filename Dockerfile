FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY server.js .
COPY .env.docker .env

EXPOSE 8080
CMD [ "npm", "start" ]
