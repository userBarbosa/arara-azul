# pull official base image
FROM node:14-alpine

# set working directory
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# add app
COPY . ./

# start app
CMD npm run start:prod