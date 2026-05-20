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
const medicationsSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date },
});
const allergiesSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date },
});
const medicalHistorySchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date },
});
const familyHistorySchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date },
});
const schema = new mongoose_1.default.Schema({
    person: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Person",
        required: true,
    },
    medications: [medicationsSchema],
    allergies: [allergiesSchema],
    medical_history: [medicalHistorySchema],
    family_history: [familyHistorySchema],
    appointments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Appointment",
        },
    ],
});
schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model("Patient", schema);
