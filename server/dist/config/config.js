"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: Number(process.env.PORT) || 3001,
    ENV: process.env.NODE_ENV || 'development',
    SECRET: process.env.SECRET || 'none',
    MONGODB_URI: process.env.MONGODB_URI || process.env.DEV_MONGODB_URI || '',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
    EMAIL: process.env.EMAIL || ''
};
exports.default = config;
