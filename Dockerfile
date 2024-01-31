FROM node:18.16

WORKDIR /myapp
COPY package.json .
RUN npm install

COPY . .
CMD npm run start