FROM node:13.6

ARG NPM_TOKEN

COPY yarn.lock .
COPY package.json .

RUN npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"

RUN yarn install --force

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

RUN npm rebuild node-sass

# Build the app
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]
