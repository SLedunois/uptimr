CREATE TABLE monitors
(
    id                          UUID                        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name                        CHARACTER VARYING           NOT NULL,
    target                      CHARACTER VARYING           NOT NULL,
    cron                        CHARACTER VARYING           NOT NULL DEFAULT '0 0/1 * 1/1 * ?',
    status                      CHARACTER VARYING           NOT NULL DEFAULT 'WAITING' CHECK (status IN ('WAITING', 'SUCCESS', 'ERROR')),
    owner                       UUID                        NOT NULL,
    created                     TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    uptime                      TIMESTAMP WITHOUT TIME ZONE,
    expected_status_code        INT                         NOT NULL DEFAULT 200,
    expected_content_type       CHARACTER VARYING CHECK ( expected_content_type IN (null, 'xml', 'json')),
    expected_content_expression CHARACTER VARYING,
    expected_content_value      CHARACTER VARYING,
    CONSTRAINT fk_users_id FOREIGN KEY (owner) REFERENCES users (id)
);

CREATE TABLE monitors_metrics
(
    id         UUID                        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    monitor_id UUID                        NOT NULL,
    target     CHARACTER VARYING           NOT NULL,
    time       BIGINT                      NOT NULL,
    fire_time  TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    stacktrace TEXT,
    status     CHARACTER VARYING           NOT NULL CHECK ( status IN ('SUCCESS', 'ERROR') ),
    CONSTRAINT fk_monitor_id FOREIGN KEY (monitor_id) REFERENCES monitors (id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION update_monitor_state() RETURNS TRIGGER AS
$BODY$
BEGIN
    UPDATE monitors SET status = NEW.status WHERE id = NEW.monitor_id;

    RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION notify_monitor_state_changes() RETURNS TRIGGER AS
$BODY$
BEGIN
    IF NEW.status <> OLD.status THEN
        PERFORM pg_notify('monitor_state_changes', row_to_json(NEW)::text);
    END IF;

    RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_monitor_uptime() RETURNS TRIGGER AS
$BODY$
BEGIN
    IF NEW.status = 'SUCCESS' AND OLD.uptime IS NULL THEN
        NEW.uptime = now();
    END IF;

    IF NEW.status = 'ERROR' THEN
        NEW.uptime = null;
    END IF;

    RETURN NEW;
END;
$BODY$
    LANGUAGE plpgsql;

CREATE TRIGGER update_monitor_uptime_trigger
    BEFORE UPDATE OF status
    ON monitors
    FOR EACH ROW
EXECUTE PROCEDURE update_monitor_uptime();

CREATE TRIGGER update_monitor_state_trigger
    AFTER INSERT
    ON monitors_metrics
    FOR EACH ROW
EXECUTE PROCEDURE update_monitor_state();

CREATE TRIGGER update_monitor_state_changes_trigger
    AFTER UPDATE OF status
    ON monitors
    FOR EACH ROW
EXECUTE PROCEDURE notify_monitor_state_changes();