CREATE TABLE users
(
    id        CHARACTER VARYING(36)  NOT NULL PRIMARY KEY,
    password  CHARACTER VARYING(255) NOT NULL,
    salt      CHARACTER VARYING(255) NOT NULL,
    iteration INT                    NOT NULL,
    role      CHARACTER VARYING(255) NOT NULL DEFAULT 'user',
    username  CHARACTER VARYING(255) NOT NULL
);

CREATE INDEX idx_user_username ON users USING btree (username);

