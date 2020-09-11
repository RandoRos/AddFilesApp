FROM node:12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD [ "node", "-r", "esm", "src/index.js" ]
