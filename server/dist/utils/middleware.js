"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const logger = require('./logger')
const morgan_1 = __importDefault(require("morgan"));
const responses_1 = __importDefault(require("../constants/responses"));
morgan_1.default.token("body", function getBody(req) {
    return JSON.stringify(req.body);
});
const morganLogger = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms :body");
const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
        return response.status(400).send({ error: responses_1.default.ERR_ID_FORMAT });
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    else if (error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")) {
        return response.status(400).json({ error: responses_1.default.ERR_VALUE_NOT_UNIQUE });
    }
    else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: responses_1.default.ERR_TOKEN_INVALID });
    }
    else if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: responses_1.default.ERR_TOKEN_EXPIRED });
    }
    // eslint-disable-next-line no-unreachable
    next(error);
};
const tokenExtractor = (request, response, next) => {
    request.token = null;
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "");
    }
    next();
};
exports.default = {
    morganLogger,
    errorHandler,
    tokenExtractor,
};
