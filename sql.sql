CREATE DATABASE hospitality;
USE hospitality;

CREATE TABLE guests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  room_number INT,
  check_in_date DATE,
  check_out_date DATE
);
