CREATE TABLE comments (
  id SERIAL PRIMARY KEY,            -- Unique identifier for each comment
  user_name VARCHAR(255) NOT NULL,   -- Name of the user who posted the comment
  message_text TEXT NOT NULL,       -- The text content of the comment
  email VARCHAR(255) NOT NULL,       -- Email address of the user
  parent_id INTEGER,                -- Identifier for the parent comment (if it's a reply)
  home_page VARCHAR(255),           -- User's personal webpage (if provided)
  file_path VARCHAR(255),           -- Path to an attached file (if applicable)
  created_at TIMESTAMPTZ DEFAULT current_timestamp, -- Timestamp of comment creation
  FOREIGN KEY (parent_id) REFERENCES comments(id) -- Ensures parent_id references a valid comment
);

--PostgreSQL data base