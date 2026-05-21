"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/", async (request, response) => {
    const { username, password } = request.body;
    const user = await user_1.default.findOne({ username });
    const hash = user !== null && "passwordHash" in user && user.passwordHash !== undefined
        ? user.passwordHash
        : "";
    const passwordCorrect = user === null ? false : await bcrypt_1.default.compare(password, hash);
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password",
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    let token = jsonwebtoken_1.default.sign(userForToken, config_1.default.SECRET);
    if (config_1.default.ENV === "production") {
        // token expires in 60*60 seconds
        token = jsonwebtoken_1.default.sign(userForToken, config_1.default.SECRET, { expiresIn: 60 * 60 });
    }
    response
        .status(200)
        .send({ token, username: user.username, access: user.access });
});
exports.default = router;
