-- schema.sql
-- Since we might run the import many times we'll drop if exists
DROP DATABASE IF EXISTS api;

CREATE DATABASE api;

-- Make sure we're using our `blog` database
\c api;

-- We can create our user table
CREATE TABLE IF NOT EXISTS users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

-- -- We can create our post table
-- CREATE TABLE IF NOT EXISTS post (
--   id SERIAL PRIMARY KEY,
--   userId INTEGER REFERENCES user(id),
--   title VARCHAR,
--   content TEXT,
--   image VARCHAR,
--   date DATE DEFAULT CURRENT_DATE
-- );