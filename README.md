# [NestJs](https://github.com/nestjs/nest) boiler-plate repository

## Features

> This repository could be used as a base repo for all our internal new projects. This codebase has the implementation of following features:
- JWT
- RBAC Implementation (User and Admin roles are supported. Extended to multiple roles)
- Swagger based API
- Added Support for Migration (This boilerplate is based on TypeORM and MySQL)
- Winston based Logger implementation ( log rotation is also added)
- Husky for running the pre, post-commit hooks (Running prettier and linting)
- PM2 based prod deployment
- The boilerplate repo is Dockerized. Though it's not properly, It could be optimized further.
- Directory structure has following modules
  - User
  - Authentication (Responsible for JWT Authentication & Generating JWT token. (Refresh token functionality could be added at later stages if required.))
  - Core (This module will have common services/decorators/config
  - Shared (We create it to define common components DTOs, utils, exceptions used across the App)

## Installation

```bash
$ npm install
```

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://docs.docker.com/docker-for-windows/install/) or [Docker Toolbox](https://github.com/docker/toolbox/releases)
- [Nest CLI](https://docs.nestjs.com/cli/overview)

---

## Running the app

1. Clone the git repository

   ```bash
   git clone https://gitlab.com/development-team20/nestjs-boilerplate
   ```

1. Go into the project directory

   ```bash
   cd nest-boilerplate/
   ```

1. Checkout working branch

   ```bash
   git checkout <branch>
   ```

1. Install dependencies

   ```bash
   yarn install
   ```

1. Copy `.env.template` to `.env`

   ```bash
   cp .env.template .env
   ```

1. Replace the values of the variables with your own

1. Create Docker images and launch them

   ```bash
   docker-compose up -d --build
   ```

1. Access the API documentation http://localhost:3000/api/v1/api-docs/#/ to check if everything is up and running.

---

## Running the app in Prod Mode using PM2

To start the app in prod mode run following command

```bash
$ npm run start:prod-pm2
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
