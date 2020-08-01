-- schema.sql
-- Since import may be run many times it will be dropped if it already exists
DROP DATABASE IF EXISTS api;

CREATE DATABASE api;

-- Make sure this is using the `api` database
\c api;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);
