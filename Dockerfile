FROM node:13.6

ARG NPM_TOKEN
COPY package.json package.json
COPY .npmrc .npmrc
#COPY package.json package.json
RUN yarn -v
RUN yarn install --force
RUN rm -f .npmrc

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

RUN npm rebuild node-sass

# Running the app
CMD [ "yarn", "dev" ]
