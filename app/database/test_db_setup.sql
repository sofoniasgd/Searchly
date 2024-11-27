-- Prepares a MySQL server for the project.
CREATE DATABASE IF NOT EXISTS searchly_test_db;
CREATE USER IF NOT EXISTS 'sys_test_usr'@'localhost' IDENTIFIED BY 'sy_test_pwd';
GRANT ALL PRIVILEGES ON searchly_test_db. * TO 'sys_test_usr'@'localhost';
GRANT SELECT ON performance_schema. * TO 'sys_test_usr'@'localhost';
-- to run the script, use the following command
-- mysql --user="username" --password="yourpassword" < "filepath"


-- create the table
USE searchly_test_db;

CREATE TABLE IF NOT EXISTS documents (
    tin_number CHAR(10) NOT NULL PRIMARY KEY, -- The unique TIN number (10-digit fixed length)
    name VARCHAR(255) DEFAULT NULL,          -- Optional name of the customer/document
    location VARCHAR(255) DEFAULT NULL,      -- Optional location information
    parent_dir VARCHAR(255) NOT NULL,        -- Immediate parent directory of the file
    file_path TEXT NOT NULL,                 -- Full file path to the PDF file on the server
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Auto-stamp for when the record was created
);