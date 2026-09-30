CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    link TEXT NOT NULL,
    description TEXT,
    author_id UUID REFERENCES users (id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_documents_created_at ON documents (created_at DESC);
CREATE INDEX ix_documents_subject ON documents (subject);
