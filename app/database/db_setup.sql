-- Prepares a MySQL server for the project.
CREATE DATABASE IF NOT EXISTS searchly_db;
CREATE USER IF NOT EXISTS 'sy_dev_usr'@'localhost' IDENTIFIED BY 'sy_dev_pwd';
CREATE USER IF NOT EXISTS 'sy_sys_usr'@'localhost' IDENTIFIED BY 'sy_sys_pwd';
GRANT ALL PRIVILEGES ON searchly_db. * TO 'sy_dev_usr'@'localhost';
GRANT ALL PRIVILEGES ON searchly_db. * TO 'sy_sys_usr'@'localhost';
GRANT SELECT ON performance_schema. * TO 'sy_dev_usr'@'localhost';
GRANT SELECT ON performance_schema. * TO 'sy_sys_usr'@'localhost';
-- to run the script, use the following command
-- mysql --user="username" --password="yourpassword" < "filepath"


-- create the table
USE searchly_db;

CREATE TABLE IF NOT EXISTS documents (
    tin_number CHAR(10) NOT NULL PRIMARY KEY, -- The unique TIN number (10-digit fixed length)
    name VARCHAR(255) DEFAULT NULL,          -- Optional name of the customer/document
    location VARCHAR(255) DEFAULT NULL,      -- Optional location information
    parent_dir VARCHAR(255) NOT NULL,        -- Immediate parent directory of the file
    file_path TEXT NOT NULL,                 -- Full file path to the PDF file on the server
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Auto-stamp for when the record was created
);