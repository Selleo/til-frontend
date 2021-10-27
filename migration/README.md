# import

```
create table import(id serial, email varchar, first_name varchar, last_name varchar, image varchar, uuid string, username string);
\copy import(id,email,username,uuid) FROM '/home/bart/selleo/til/migration/users.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
\ds
select setval('import_id_seq', (SELECT MAX(id) FROM import ));
drop table import;
```

categories:
id | name | official | url | first_text | second_text

posts:
id | title | body | is_public | author_id | inserted_at | updated_at | reviewed

posts_categories:
id | post_id | category_id | position
