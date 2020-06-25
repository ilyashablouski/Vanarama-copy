FROM node:13.6

ARG NPM_TOKEN
ARG API_KEY
ARG API_URL
ARG LOQATE_KEY
ARG NODE_ENV

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
RUN npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
COPY yarn.lock .
COPY package.json .
RUN yarn install --force

# Copying source files
COPY . .

RUN npm rebuild node-sass

# Build the app
RUN yarn build

EXPOSE 8080

# Running the app
CMD [ "yarn", "start" ]
