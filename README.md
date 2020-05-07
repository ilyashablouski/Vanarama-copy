# Next-Storefront

[![Build Status](http://jenkins.autorama.co.uk:8080/buildStatus/icon?job=next-storefront%2Fdevelop)](http://jenkins.autorama.co.uk:8080/job/next-storefront/job/develop/)

<img src="logos.png" width="640">

Next.js Storefront frontend.

## Prerequisites

- Install [yarn](https://yarnpkg.com/lang/en/docs/install).
- Install [Docker](https://www.docker.com/) (optional).
- Globally install [serve](https://www.npmjs.com/package/serve) (optional).

## Getting Started

### Install dependencies

```
$ yarn install
```

### Start dev server locally

```
$ yarn dev
```

Open [localhost](http://localhost:6601).

### Export static website

```
$ yarn build

$ yarn export
```

Static website will be available in the "out" folder.

```
$ serve -p 8080 out
```

Open [localhost](http://localhost:8080).

### Developing locally with Docker

You need to have the environment variable `NPM_TOKEN` set for this to install dependencies correctly. Easiest way to do this is to edit your `.bashrc` or `.zshrc` files with the following:

```sh
export NPM_TOKEN=your-token-goes-here
```

**N.B** Don't wrap the token in quotes!

You can get a token by logging into NPM as the user `autoramasultan` or by asking one of the devs.

Then simply run:
```sh
docker-compose up
```

Volume mounting is configured in the `docker-compose.yml` and therefore you will get hot module reloading when changing code locally.

## Unit Tests

Unit tests are perfomed using [Jest](https://jestjs.io/) and
[jest-extended](https://github.com/jest-community/jest-extended/).

### Running tests

```
$ docker-compose exec next-storefront yarn test
```

## Linting && Prettier

tslint has been configured to the standard AirBNB styleguide rules, to run linting on your files you can use 
`yarn run lint` and fix any errors. 

This will eventually be moved to a githook on commit / push. 

AirBNB Styleguide can be found here : [AIRBNB JSSG](https://github.com/airbnb/javascript)

## Built With

- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [Express](https://expressjs.com/)

## Authors

- **Gianluca Agnocchetti** - _Initial work_ -
  [iamgnlc](https://github.com/iamgnlc)
- **Warren Baugh** - _Redux support_ -
  [street2geek](https://github.com/street2geek)

See also the list of
[contributors](https://github.com/Autorama/next-storefront/graphs/contributors)
who participated in this project.
