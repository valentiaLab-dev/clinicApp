"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appointment_1 = __importDefault(require("../models/appointment"));
const user_1 = __importDefault(require("../models/user"));
const notification_1 = __importDefault(require("../models/notification"));
const express_1 = __importDefault(require("express"));
const responses_1 = __importDefault(require("../constants/responses"));
const router = express_1.default.Router();
router.get("/", async (request, response) => {
    const collection = await notification_1.default.find({});
    response.setHeader("X-Total-Count", "10");
    response.setHeader("Access-Control-Expose-Headers", "Content-Range");
    response.setHeader("Content-Range", "bytes: 0-9/*");
    response.json(collection);
});
router.post("/", async (request, response) => {
    const body = request.body;
    if (config_1.default.ENV !== "test") {
        const decodedToken = jsonwebtoken_1.default.verify(request.token ?? '', config_1.default.SECRET);
        if (typeof decodedToken === 'string') {
            return response.status(400).json({ error: responses_1.default.ERR_TOKEN_INVALID });
        }
        const user = await user_1.default.findById(decodedToken.id);
    }
    const isApptExist = await appointment_1.default.findOne({ _id: body.appointment });
    if (isApptExist === null) {
        return response.status(400).json({ error: responses_1.default.ERR_APPT_INVALID });
    }
    const item = new notification_1.default(body);
    const savedItem = await item.save();
    response.status(201).json(savedItem).end();
});
router.get("/:id", async (request, response) => {
    const id = request.params.id.trim();
    const result = await notification_1.default.find({ _id: id });
    if (result) {
        result[0].id = result[0]._id.toString();
        response.json(result[0]);
    }
    else {
        response.status(404).end();
    }
});
router.post("/send", async (request, response) => {
    console.log("Received notification request:", request.body);
    if (request.body === undefined) {
        return response.status(400).send("Missing required fields");
    }
    const { to, subject, text, html } = request.body;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(config_1.default.SENDGRID_API_KEY);
    const msg = {
        to: to || config_1.default.EMAIL,
        from: config_1.default.EMAIL,
        subject: subject || 'Clinic is open for business!',
        text: text || 'We are open for business! Please book your appointment now.',
        html: html || 'We are open for business! Please book your appointment <strong>now.</strong>',
    };
    sgMail
        .send(msg)
        .then((response) => {
        console.log(response[0].statusCode);
    })
        .catch((error) => {
        console.error(error);
    });
    response.status(200).send("Notification sent successfully");
});
router.put("/:id", async (request, response) => {
    console.log("Received notification request:", request.body);
    if (request.body === undefined) {
        return response.status(400).send("Missing required fields");
    }
    const { to, subject, text, html, status } = request.body;
    if (status && status === 'sending') {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(config_1.default.SENDGRID_API_KEY);
        const msg = {
            to: to || config_1.default.EMAIL,
            from: config_1.default.EMAIL,
            subject: subject || 'Clinic is open for business!',
            text: text || 'We are open for business! Please book your appointment now.',
            html: html || 'We are open for business! Please book your appointment <strong>now.</strong>',
        };
        sgMail
            .send(msg)
            .then((response) => {
            console.log(response[0].statusCode);
        })
            .catch((error) => {
            console.error(error);
        });
        response.status(200).send("Notification sent successfully");
    }
    const id = request.params.id;
    const body = request.body;
    const result = await notification_1.default.findOneAndUpdate({ _id: { $eq: id } }, body, {
        new: true,
    });
    response.status(200).json(result);
});
exports.default = router;
