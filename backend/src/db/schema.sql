CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pdfs (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  text_content TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  content TEXT
);
CREATE TABLE IF NOT EXISTS pdfs (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  filepath TEXT NOT NULL,
  text_content TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
SELECT id, filename, created_at FROM pdfs ORDER BY id DESC LIMIT 5;
-- To view text content
SELECT text_content FROM pdfs WHERE id = <the_id>;

