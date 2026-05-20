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
    appointment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },
    subject: {
        type: String,
    },
    to: {
        type: String,
    },
    text: {
        type: String,
    },
    html: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "sent", "failed"],
        default: "pending",
    },
    type: {
        type: String,
        enum: ["email", "sms"],
        default: "email",
        required: true,
    },
    scheduled_date: {
        type: Date,
        default: Date.now,
    },
    sent_date: {
        type: Date,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    created_by: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
schema.pre("save", function (next) {
    // TODO: trigger notification here
    next();
});
schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model("Notification", schema);
