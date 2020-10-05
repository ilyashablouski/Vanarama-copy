FROM node:12.13.0

ARG NPM_TOKEN
ARG API_KEY
ARG API_URL
ARG LOQATE_KEY
ARG NODE_ENV
ARG ENV
ARG GTM_ID
ARG ENABLE_DEV_TOOLS
ARG GITHUB_TOKEN
ARG HOSTNAME
ARG IMAGE_OPTIMIZATION_HOST
ARG NODE_OPTIONS

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

# Build the app (this is now executed in "yarn start" command)
RUN yarn build

EXPOSE 8080

# Running the app
CMD [ "yarn", "start" ]
