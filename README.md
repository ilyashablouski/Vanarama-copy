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

### Export static website

```
$ yarn build

$ yarn export
```

Static website will be available in the "out" folder.

```
$ serve -p 8080 out
```

Open [localhost](http://localhost:808).

### Start dev server with Docker container

```
$ docker-compose up [--build]
```

## Built With

- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)

## Authors

- **Gianluca Agnocchetti** - _Initial work_ -
  [iamgnlc](https://github.com/iamgnlc)
- **Warren Baugh** - _Redux support_ -
  [street2geek](https://github.com/street2geek)

See also the list of
[contributors](https://github.com/Autorama/next-storefront/graphs/contributors)
who participated in this project.
