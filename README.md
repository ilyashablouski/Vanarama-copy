# Next-Storefront

[![Build Status](https://jenkins.autorama.co.uk/buildStatus/icon?job=next-storefront%2Fdevelop)](https://jenkins.autorama.co.uk/job/next-storefront/job/develop/)
![Version](https://img.shields.io/badge/dynamic/json?color=blue&label=version&prefix=v&query=%24.version&url=https%3A%2F%2Fe49ee07a33e40aab8c7c4b39816a12eb6734f2f0%40raw.githubusercontent.com%2FAutorama%2Fnext-storefront%2Fdevelop%2Fpackage.json)
![License](https://img.shields.io/badge/dynamic/json?color=888&label=license&query=%24.license&url=https%3A%2F%2Fe49ee07a33e40aab8c7c4b39816a12eb6734f2f0%40raw.githubusercontent.com%2FAutorama%2Fnext-storefront%2Fdevelop%2Fpackage.json)

<img src="logos.png" width="640">

Next.js Storefront frontend.

Install the dependencies 

```sh
$ yarn install
```

## Development mode

Run:

```sh
$ yarn dev
```

## Production mode

Run:

```sh
$ yarn build

$ yarn start
```

Open [http://localhost:6601](http://localhost:6601).

## Generate Apollo types

Run:

```sh
$ yarn apollo:generate
```

## Running tests

Tests are executed using [Jest](https://jestjs.io/).

### Locally

```sh
$ yarn test
```

## Static Code Analysis

ESLint has been configured to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). To run linting on your files you can use:

```sh
$ yarn lint
```

## Built With

- [Next.js](https://nextjs.org/)
- [Apollo](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)
- [Express](https://expressjs.com/)

## Authors

- **Gianluca Agnocchetti** - _Initial work_ - [iamgnlc](https://github.com/iamgnlc)
- **Warren Baugh** - _Redux support_ - [street2geek](https://github.com/street2geek)

See also the list of
[contributors](https://github.com/Autorama/next-storefront/graphs/contributors)
who participated in this project.
