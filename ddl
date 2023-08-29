-- Create a database
CREATE DATABASE bookstore;

-- Use the newly created database
USE bookstore;

-- Create a table to store books
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publication_year INT,
  genre VARCHAR(50)
);

-- Insert some sample data
INSERT INTO books (title, author, publication_year, genre)
VALUES
  ('Book 1', 'Author 1', 2020, 'Fiction'),
  ('Book 2', 'Author 2', 2018, 'Mystery'),
  ('Book 3', 'Author 3', 2015, 'Science Fiction');

