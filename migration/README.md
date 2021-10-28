# import

```
TRUNCATE users CASCADE;
\copy users(id,email,username,uuid) FROM '/app/users.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
select setval('users_id_seq', (SELECT MAX(id) FROM users));
```

```
TRUNCATE categories CASCADE;
\copy categories(id,name,official) FROM '/app/categories.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
select setval('categories_id_seq', (SELECT MAX(id) FROM categories));
```

```
TRUNCATE posts CASCADE;
\copy posts(id,title,body,is_public,author_id,inserted_at,updated_at,reviewed) FROM '/app/posts.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
select setval('posts_id_seq', (SELECT MAX(id) FROM posts));
```

```
TRUNCATE posts_categories CASCADE;
\copy posts_categories(post_id, category_id) FROM '/app/posts_categories.csv' WITH (FORMAT 'csv', HEADER TRUE,   QUOTE '"' , DELIMITER ',');
```

posts:
id | title | body | is_public | author_id | inserted_at | updated_at | reviewed

posts_categories:
id | post_id | category_id | position
