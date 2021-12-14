FROM node:12.22.7-alpine

ARG API_KEY
ARG API_URL
ARG LOQATE_KEY
ARG NODE_ENV
ARG ENV
ARG GTM_ID
ARG MICROBLINK_URL
ARG ENABLE_DEV_TOOLS
ARG PRERENDER_SERVICE_URL
ARG IMG_OPTIMISATION_HOST
ARG NODE_OPTIONS
ARG HOST_DOMAIN
ARG HEAP_ID

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
RUN yarn set version berry

COPY yarn.lock .
COPY package.json .
COPY .yarnrc.yml .
## --frozen-lockfile has been deprecated for --immutable in yarn2+
RUN yarn install --immutable

# Copying source files
COPY . .

RUN npm rebuild node-sass

RUN yarn build
RUN apk add --no-cache bash
#for running GO binary on alpine image
RUN apk add --no-cache libc6-compat 
EXPOSE 8080

# Running the app
ENTRYPOINT ["./start.sh"]
CMD [ "yarn", "start" ]