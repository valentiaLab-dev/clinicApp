"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../utils/logger"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
const url = config_1.default.MONGODB_URI;
mongoose_1.default.connect(url).catch((error) => {
    logger_1.default.error("error connecting to MongoDB:", error.message);
});
const schema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    suffix: {
        type: String,
        default: " ",
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birth_date: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
    },
});
schema.index({ first_name: 1, middle_name: 1, last_name: 1, suffix: 1 }, { unique: true });
schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model("Person", schema);
