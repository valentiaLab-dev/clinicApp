"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const full_name = ['first_name', 'middle_name', 'last_name', 'suffix'];
const PATIENT_NAME = {
    path: 'patient',
    populate: {
        path: 'person',
        select: full_name
    }
};
const PHYSICIAN_NAME = {
    path: 'physician',
    populate: {
        path: 'person',
        select: full_name
    }
};
const APPT_DETAILS = {
    path: 'appointment'
};
exports.default = {
    PATIENT_NAME,
    PHYSICIAN_NAME,
    APPT_DETAILS
};
