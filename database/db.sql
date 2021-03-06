CREATE DATABASE database_links;
USE database_links;
-- USERS TABLE
CREATE TABLE users (
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
/* 
 Para modificar la tabla uso ALTER TABLE 
 - Agrego el primary key 
 - Modifico el id y hago que se incremente de a 2 unidades
 */
ALTER TABLE users
ADD PRIMARY KEY (id);
ALTER TABLE users
MODIFY id INT(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;
DESCRIBE users;
-- LINKS TABLE
CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description text,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE links
ADD PRIMARY KEY (id);
ALTER TABLE links
MODIFY id INT(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;
describe links