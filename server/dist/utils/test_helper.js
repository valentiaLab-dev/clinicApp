"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const person_1 = __importDefault(require("../models/person"));
const employee_1 = __importDefault(require("../models/employee"));
const position_1 = __importDefault(require("../models/position"));
const patient_1 = __importDefault(require("../models/patient"));
const access_1 = __importDefault(require("../models/access"));
const allDbUsers = async () => {
    const collection = await user_1.default.find({});
    return collection.map((u) => u.toJSON());
};
const allDbPersons = async () => {
    const collection = await person_1.default.find({});
    return collection.map((u) => u.toJSON());
};
const allDbEmployees = async () => {
    const collection = await employee_1.default.find({});
    return collection.map((u) => u.toJSON());
};
const allDbPositions = async () => {
    const collection = await position_1.default.find({});
    return collection.map((u) => u.toJSON());
};
const allDbPatients = async () => {
    const collection = await patient_1.default.find({});
    return collection.map((u) => u.toJSON());
};
const allDbAccess = async () => {
    const collection = await access_1.default.find({});
    return collection.map((u) => u.toJSON());
};
exports.default = {
    allDbUsers,
    allDbPersons,
    allDbEmployees,
    allDbPositions,
    allDbPatients,
    allDbAccess,
};
