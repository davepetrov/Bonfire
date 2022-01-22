<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript backend. Used with swagger for api documentation (see [swagger-spec.json](./swagger-spec.json)).

## Basic Documentation
I'd recommend looking at [nestjs docs](https://docs.nestjs.com), but here is what you need to know. The app is run from [main.ts](src/main.ts) where it creates a nest app using the [App Module](src/app.module.ts).

Modules are responsible for setting up imports, controllers and services and are being used on a endpoint basis represented by the folders. As you can see in the [App Module](src/app.module.ts), it imports the other modules that are used, for example the [BoardModule](src/board/board.module.ts).

The [board module](src/board/board.module.ts) then sets up the [board controller](src/board/board.controller.ts), [services](src/board/board.service.ts) and the [auth module](src/auth/auth.module.ts) (responsible for ensuring users are authenticated). Every controller is then split up by endpoint, represented by the function where the decorators represent the endpoint information.

## Compatibility
Be sure to run using Node 14 and npm 7

## Installation

```bash
$ npm install --include=dev
```

## Running the app

```bash
# development
# runs on port 3000
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database
 Database credentials should be stored in [.env](.env) which should be created from [.env.bak](.env.bak). Follow these steps withing the [.env.bak](.env.bak) to connect prisma to your local db
```bash
$ cp .env.bak .env
```

Setup with MacOS
```bash
# Install
$ brew install mysql

# Start the db server
$ brew services start mysql

# Stop the db server
$ brew services stop mysql
```

Setup with windows
```bash
# Good luck figuring it out lol
```


Adding a mysql connection
- Run mysql as root in bash
```bash
$ mysql -uroot
```
- Update the connection email/password
```SQL
ALTER USER 'root'@'localhost' IDENTIFIED BY '1234';
```
- Now go to .env file and update it with your username and password

```bash
# to apply schema to your database
$ npx prisma db push

# to apply database to your schema
$ npx prisma db pull

# To reflect prisma changes to the client
$ npx prisma generate
```

## Swagger
Swagger documentation is available at [swagger-spec.json](./swagger-spec.json) or at [localhost:3000/api-docs](http://localhost:3000/api-docs). If you would like to visualize [swagger-spec.json](./swagger-spec.json) and don't have localhost set, you can use the [Swagger editor](https://editor.swagger.io) to visualize it.
