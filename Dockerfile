FROM node:13.6

ARG NPM_TOKEN

COPY .npmrc .npmrc

RUN npm install yarn --force

RUN rm -f .npmrc


# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
#COPY package*.json ./

RUN yarn install

# Copying source files
COPY . .

# Building app
# RUN npm run build

RUN npm rebuild node-sass

# Running the app
CMD [ "yarn", "dev" ]
