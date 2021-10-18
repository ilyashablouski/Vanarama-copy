# Next-Storefront

[![Build Status](https://jenkins.autorama.co.uk/buildStatus/icon?job=next-storefront%2Fdevelop&config=BuildBadge)](https://jenkins.autorama.co.uk/job/next-storefront/job/develop/)
![Version](https://img.shields.io/badge/dynamic/json?color=blue&label=version&prefix=v&query=%24.version&url=https%3A%2F%2Fe49ee07a33e40aab8c7c4b39816a12eb6734f2f0%40raw.githubusercontent.com%2FAutorama%2Fnext-storefront%2Fdevelop%2Fpackage.json)
![License](https://img.shields.io/badge/dynamic/json?color=888&label=license&query=%24.license&url=https%3A%2F%2Fe49ee07a33e40aab8c7c4b39816a12eb6734f2f0%40raw.githubusercontent.com%2FAutorama%2Fnext-storefront%2Fdevelop%2Fpackage.json)

Next.js Storefront frontend.

## Prerequisites

- Install [yarn](https://yarnpkg.com/lang/en/docs/install).

### Optional

- Install [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) globally.

Install the dependencies

```sh
$ yarn install
```

### Optionally creating .env for running locally

**This is an optional step if a .env does not already exist in the repo**

All application parameter names are defined in `env.template`. A shared utility executable `build-env-var` uses this template to retrieve parameter values for each key from AWS parameter store for a given environment. Curl the executable from S3 to the repo root:

```sh
curl https://build-env-var.s3.eu-west-2.amazonaws.com/build-env-var.macos-amd64 --output build-env-var.macos-amd64 && chmod a+x build-env-var.macos-amd64
```

Note that other variants of the utility are available for ubuntu and macOS arm architecture.

Next, run the utility to create a .env file. Assuming that `vanarama_dev` is the name of your local AWS profile for development then the following command will genreate a working `dev` `.env` file for customers.

```sh
AWS_PROFILE=vanarama_dev ./build-env-var.macos-amd64 -ssmPrefix /dev/grid/customers -envFile .env
``` 
Note, you _must_ edit this .env file based on the config of the local dependencies such as Postgres, Redis etc. It is recommended that you don't commit this file (see .gitignore).

Note that .env files can be generated for other environments if you have AWS permissions to read the config. Change the values for `AWS_PROFILE` and `-ssmPrefix` and re-run the utility.

Note that the same executable and mechanism is used by the app when it runs in docker (see [start.sh](start.sh))

## Adding a new config parameter

Follow this process for sensitive or non-sensitive parameters. All parameter names should be UPPERCASE_UNDERSCORE.

1. Edit .env to add your new parameter. Write the code that uses it. Test it locally.
2. Once the new parameter is tested, insert the parameter name into `env.template`.
3. Raise a PR in the normal way.
4. Collect the new parameter values for `dev`, `uat`, `pre-prod` and `prd` and insert them into `autorama-app-config` repo and raise a separate PR.
5. Merge your PR on `autorama-app-config` and run the pipeline into `dev`.
6. Merge your PR on this repo into develop.
7. Check the app is deployed and running as expected with the new config parameter.
8. Release the `autorama-app-config` pipeline to deploy the new config to the remaining environments.
9. Follow the normal application release process for `uat` and higher.

## Development mode

```sh
$ yarn dev
```

## Production mode

Choose branch and environment:

- Switch to the latest `master` branch
- Enable `Prod gateway` in `.env` file

Run:

```sh
$ yarn build

$ yarn start
```

Open [http://localhost:6601](http://localhost:6601).

## Generate Apollo types

```sh
$ yarn apollo:generate
```

## Running tests

Tests are executed using [Jest](https://jestjs.io/).

```sh
$ yarn test
```

## TypeScript types check

```sh
$ yarn typecheck
```

## Static Code Analysis

ESLint has been configured to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). To run linting on your files you can use:

```sh
$ yarn lint
```

## Storybook

Storybook is used to visualize atom design components:

```sh
$ yarn storybook
```

## Built With

- [Next.js](https://nextjs.org/)
- [Apollo](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)
- [Express](https://expressjs.com/)
- [Storybook](https://storybook.js.org/)

## Authors

- **Artemij Fedosejev** - _Lead engineer_ - [fedosejev](https://github.com/fedosejev)
- **Gianluca Agnocchetti** - _Initial work_ - [iamgnlc](https://github.com/iamgnlc)
- **Warren Baugh** - _Redux support_ - [street2geek](https://github.com/street2geek)
- **Aliaksei Douhal** - _Search, PDP_ - [AliakseiDouhal](https://github.com/AliakseiDouhal)
- **Anton Adamkovich** - _Search, PDP_ - [AntonAdamkovich](https://github.com/AntonAdamkovich)

See also the list of
[contributors](https://github.com/Autorama/next-storefront/graphs/contributors)
who participated in this project.

## Main technologies

<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Next JS" src="https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/> <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/> <img alt="GraphQL" src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white"/> <img alt="Storybook" src="https://img.shields.io/badge/Storybook-%23ff4785.svg?style=for-the-badge&logo=storybook&logoColor=white"/>
