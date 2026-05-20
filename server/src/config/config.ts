import dotenv from "dotenv";

dotenv.config();

interface Config {
  PORT: number;
  ENV: string;
  SECRET: string;
  MONGODB_URI: string;
  SENDGRID_API_KEY: string;
  EMAIL: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3001,
  ENV: process.env.NODE_ENV || "development",
  SECRET: process.env.SECRET || "none",
  MONGODB_URI: process.env.MONGODB_URI || process.env.DEV_MONGODB_URI || "",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
  EMAIL: process.env.EMAIL || "",
};

export default config;
