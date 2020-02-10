FROM node:10

RUN npm install -g yarn --force

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Building app
# RUN npm run build

# Running the app
CMD [ "yarn", "dev" ]
