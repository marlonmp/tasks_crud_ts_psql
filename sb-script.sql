CREATE DATABASE test_db;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
    passwd TEXT
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description TEXT NOT NULL,
    creation_date DATE NOT NULL
);