- Generate Migration File for Models: `npm run generate "<CLASS NAME>"`

* It will generate a migration file for the same in the dir
  `/src/database/migration`

* Run `npm run build` and the again run `npm run typeorm migration:run` to
  create the table in the DB.

- Run migration for the first time: `npm run typeorm migration:run`

<!-- delete dist > build > generate > build > run migration-->
