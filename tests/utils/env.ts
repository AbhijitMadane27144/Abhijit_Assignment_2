import dotenv from "dotenv";
 
dotenv.config();

export const ENV = {
  baseURL: 'http://localhost:3000',
  adminURL: 'http://localhost:3000/admin/login',

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSLMODE === "disable" ? false : true,
  }
  
};



