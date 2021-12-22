# import

```
TRUNCATE users CASCADE;
TRUNCATE categories CASCADE;
TRUNCATE posts_categories CASCADE;
TRUNCATE posts CASCADE;

\copy users(id,email,username,uuid,first_name,last_name) FROM '/app/u.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
select setval('users_id_seq', (SELECT MAX(id) FROM users));

\copy categories(id,name,official) FROM '/app/c.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
select setval('categories_id_seq', (SELECT MAX(id) FROM categories));

\copy posts(id,title,slug,body,is_public,author_id,inserted_at,updated_at,reviewed) FROM '/app/p.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
select setval('posts_id_seq', (SELECT MAX(id) FROM posts));

\copy posts_categories(post_id, category_id) FROM '/app/pc.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
select setval('posts_categories_id_seq', (SELECT MAX(id) FROM posts_categories));
```

