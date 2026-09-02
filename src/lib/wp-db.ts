import mysql from "mysql2/promise";

export const wpDb = mysql.createPool({
  host: process.env.WORDPRESS_DB_HOST,
  port: Number(process.env.WORDPRESS_DB_PORT || 3306),
  database: process.env.WORDPRESS_DB_NAME,
  user: process.env.WORDPRESS_DB_USER,
  password: process.env.WORDPRESS_DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});