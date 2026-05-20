"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.get("/", async (request, response) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        DBActive: await user_1.default.findOne({}) ? true : false
    };
    try {
        response.send(healthcheck);
    }
    catch (e) {
        healthcheck.message = typeof e === 'string' ? e : 'unknown';
        response.status(503).send();
    }
});
exports.default = router;
