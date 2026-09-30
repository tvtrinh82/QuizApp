CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quizzes (id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMPTZ,
    is_late BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX ix_quiz_attempts_user_quiz_started
    ON quiz_attempts (user_id, quiz_id, start_time DESC);

ALTER TABLE results
    ADD COLUMN attempt_id UUID UNIQUE REFERENCES quiz_attempts (id) ON DELETE SET NULL,
    ADD COLUMN is_late BOOLEAN NOT NULL DEFAULT FALSE;
