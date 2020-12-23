# monitor-server

A project for moniter server

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```shell
$ npm i
$ npm run dev
```

### Interface

```shell
# Browser open or Postman open it
http://localhost:8080/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### database

- Set database with `config.json` and in the `database` directory
```json
// Default
{
  "development": {
    "username": "db_username",
    "baseDir": "model", 
    "password": "db_password",
    "database": "db_name",
    "host": "localhost",
    "dialect": "mysql"
  }
}
```

- And Set the `enable` parameter of `sequelize` to **true** in the `plugin` file in the `config` directory

- More information to see [sequelize][egg-sequelize]


[egg]: https://eggjs.org
[egg-sequelize]: https://eggjs.org/zh-cn/tutorials/sequelize.html

------

> Thinking in JackDan