"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const express_1 = __importDefault(require("express"));
const responses_1 = __importDefault(require("../constants/responses"));
const router = express_1.default.Router();
router.get("/", async (request, response) => {
    const collection = await user_1.default.find({});
    response.setHeader("X-Total-Count", "10");
    response.setHeader("Access-Control-Expose-Headers", "Content-Range");
    response.setHeader("Content-Range", "bytes: 0-9/*");
    response.json(collection);
});
router.get("/:id", async (request, response) => {
    const id = request.params.id.trim();
    const result = await user_1.default.find({ _id: id });
    if (result) {
        result[0].id = result[0]._id.toString();
        response.json(result[0]);
    }
    else {
        response.status(404).end();
    }
});
router.post("/", async (request, response) => {
    const { username, password, employee, access } = request.body;
    if (password.length < 3) {
        return response.status(400).json({ error: responses_1.default.ERR_PASSWORD_INVALID });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
    const item = new user_1.default({
        username,
        passwordHash,
        employee,
        access,
    });
    const savedItem = await item.save();
    response.status(201).json(savedItem);
});
router.post("/clean", async (request, response) => {
    await user_1.default.deleteMany({});
    response.json(200).end;
});
exports.default = router;
