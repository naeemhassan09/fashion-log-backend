# Pricing Engine Backend Repository

## Features

> This project will be used to handle all pricing related data:
- Dynamic Pricing of SKU

## Installation

```bash
$ yarn install
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
   git clone https://github.com/fashionlogtech/fashionlog-backend.git
   ```

1. Go into the project directory

   ```bash
   cd fashionlog-backend/
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
## Migration

# create a migration
``` yarn run migration:create companyMigration  ```
# generate a migration
```yarn  migration:generate  companyMigration  ```
# run a migration
```yarn run migration:run  ```                       