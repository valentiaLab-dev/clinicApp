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
    hire_date: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: false,
        default: 0,
    },
    is_active: {
        type: Boolean,
        required: false,
        default: true,
    },
    position: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Position",
        required: true,
    },
    person: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Person",
        required: true,
    },
});
schema.index({ position: 1, person: 1 }, { unique: true });
schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model("Employee", schema);
