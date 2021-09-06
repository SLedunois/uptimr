CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users
(
    id        UUID                   NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    password  CHARACTER VARYING(255) NOT NULL,
    salt      CHARACTER VARYING(255) NOT NULL,
    iteration INT                    NOT NULL,
    role      CHARACTER VARYING(255) NOT NULL DEFAULT 'user',
    username  CHARACTER VARYING(255) NOT NULL,
    firstname CHARACTER VARYING(255) NOT NULL,
    lastname  CHARACTER VARYING(255) NOT NULL
);

CREATE INDEX idx_user_username ON users USING btree (username);

