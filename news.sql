CREATE TABLE News (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    message TEXT
);
INSERT INTO News (title, image_url, message)
VALUES (
    'Breaking News: New Discovery',
    'https://example.com/image.jpg',
    'A new discovery has been made in the field of science...'
);
-- To retrieve the data, you can use a simple SQL query:
SELECT * FROM News;