CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(320) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_users_role CHECK (role IN ('ADMIN', 'STUDENT'))
);

CREATE UNIQUE INDEX ux_users_email_lower ON users (LOWER(email));

CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    duration_seconds INTEGER NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID REFERENCES users (id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_quizzes_duration CHECK (duration_seconds > 0)
);

CREATE INDEX ix_quizzes_published_created_at
    ON quizzes (is_published, created_at DESC);

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES quizzes (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    question_type VARCHAR(30) NOT NULL,
    points NUMERIC(8, 2) NOT NULL DEFAULT 1,
    position INTEGER NOT NULL,
    CONSTRAINT ck_questions_type
        CHECK (question_type IN ('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER')),
    CONSTRAINT ck_questions_points CHECK (points > 0),
    CONSTRAINT ck_questions_position CHECK (position > 0),
    CONSTRAINT uq_questions_quiz_position UNIQUE (quiz_id, position)
);

CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES questions (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    position INTEGER NOT NULL,
    CONSTRAINT ck_question_options_position CHECK (position > 0),
    CONSTRAINT uq_question_options_position UNIQUE (question_id, position),
    CONSTRAINT uq_question_options_id_question UNIQUE (id, question_id)
);

CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    quiz_id UUID NOT NULL REFERENCES quizzes (id) ON DELETE RESTRICT,
    score NUMERIC(10, 2) NOT NULL DEFAULT 0,
    max_score NUMERIC(10, 2) NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMPTZ,
    CONSTRAINT ck_results_score CHECK (score >= 0 AND score <= max_score),
    CONSTRAINT ck_results_max_score CHECK (max_score > 0),
    CONSTRAINT ck_results_submission_time CHECK (submitted_at IS NULL OR submitted_at >= started_at)
);

CREATE INDEX ix_results_user_submitted_at ON results (user_id, submitted_at DESC);
CREATE INDEX ix_results_quiz_submitted_at ON results (quiz_id, submitted_at DESC);

CREATE TABLE result_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    result_id UUID NOT NULL REFERENCES results (id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions (id) ON DELETE RESTRICT,
    answer_text TEXT,
    awarded_points NUMERIC(8, 2) NOT NULL DEFAULT 0,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_result_answers_points CHECK (awarded_points >= 0),
    CONSTRAINT uq_result_answers_question UNIQUE (result_id, question_id),
    CONSTRAINT uq_result_answers_id_question UNIQUE (id, question_id)
);

CREATE INDEX ix_result_answers_question ON result_answers (question_id);

CREATE TABLE result_answer_options (
    result_answer_id UUID NOT NULL,
    question_id UUID NOT NULL,
    option_id UUID NOT NULL,
    PRIMARY KEY (result_answer_id, option_id),
    CONSTRAINT fk_result_answer_options_answer
        FOREIGN KEY (result_answer_id, question_id)
        REFERENCES result_answers (id, question_id) ON DELETE CASCADE,
    CONSTRAINT fk_result_answer_options_option
        FOREIGN KEY (option_id, question_id)
        REFERENCES question_options (id, question_id) ON DELETE CASCADE
);
