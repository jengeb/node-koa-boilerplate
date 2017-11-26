# define the image we want to build from
# alpine of node available from the Docker Hub
FROM node:8-alpine

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# bundle app source
COPY . /usr/src/app

EXPOSE 9000
CMD [ "npm", "start" ]
