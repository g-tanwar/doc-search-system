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
