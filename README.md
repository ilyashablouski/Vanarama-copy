# Next-Storefront

[![Build Status](https://jenkins.autorama.co.uk/buildStatus/icon?job=next-storefront%2Fdevelop)](https://jenkins.autorama.co.uk/job/next-storefront/job/develop/)

<img src="logos.png" width="640">

Next.js Storefront frontend.

## Getting Started

Install the dependencies

```sh
$ yarn install
```

Create a `.env` file by copying `.env.example` and fill in the values

```sh
$ cp .env.example .env
```

## Developing locally

Run:

```sh
$ yarn dev
```

Open [http://localhost:6601](http://localhost:6601).

## Developing locally with Docker

You need to have the environment variable `NPM_TOKEN` set for this to install dependencies correctly. Easiest way to do this is to edit your `.bashrc` or `.zshrc` files with the following:

```sh
$ export NPM_TOKEN=your-token-goes-here
```

Or you can add it to your local `.env` if you want to keep your machine clean.

**N.B.:** Don't wrap the token in quotes!

You can get a token by logging into NPM as the user `autoramasultan` or by asking one of the devs.

Then simply run:

```sh
$ docker-compose up
```

Volume mounting is configured in the `docker-compose.yml` and therefore you will get hot module reloading when changing code locally.

## Running tests

Tests are executed using [Jest](https://jestjs.io/).

### Locally

```sh
$ yarn test
```

### With Docker

```sh
$ docker-compose exec next-storefront yarn test
```

## Static Code Analysis

ESLint has been configured to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). To run linting on your files you can use:

```sh
$ yarn lint
```

## Built With

- [Next.js](https://nextjs.org/)
- [Apollo](https://www.apollographql.com/)
- [Express](https://expressjs.com/)

## Authors

- **Gianluca Agnocchetti** - _Initial work_ - [iamgnlc](https://github.com/iamgnlc)
- **Warren Baugh** - _Redux support_ - [street2geek](https://github.com/street2geek)

See also the list of
[contributors](https://github.com/Autorama/next-storefront/graphs/contributors)
who participated in this project.
