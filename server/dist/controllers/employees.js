"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const position_1 = __importDefault(require("../models/position"));
const person_1 = __importDefault(require("../models/person"));
const employee_1 = __importDefault(require("../models/employee"));
const express_1 = __importDefault(require("express"));
const responses_1 = __importDefault(require("../constants/responses"));
const router = express_1.default.Router();
router.get("/", async (request, response) => {
    const query = "query" in request ? request.query : {};
    const filter = "filter" in query ? query.filter : {};
    const parsedFilter = typeof filter === "string" ? JSON.parse(filter) : {};
    const populate = "populate" in parsedFilter ? parsedFilter.populate : "";
    const collection = await employee_1.default.find({}).populate(populate);
    response.setHeader("X-Total-Count", "10");
    response.setHeader("Access-Control-Expose-Headers", "Content-Range");
    response.setHeader("Content-Range", "bytes: 0-9/*");
    response.json(collection);
});
// router.get("/", async (request:AuthRequest, response) => {
//   const filter = request?.query?.filter ? JSON.parse(request?.query?.filter) : {}
//   const collection = await Model.find({}).populate(filter.populate ?? "")
//   response.setHeader("X-Total-Count","10")
//   response.setHeader("Access-Control-Expose-Headers","Content-Range")
//   response.setHeader("Content-Range","bytes: 0-9/*")
//   response.json(collection);
// });
router.get("/:id", async (request, response) => {
    const id = request.params.id.trim();
    const result = await employee_1.default.find({ _id: id });
    if (result) {
        result[0].id = result[0]._id.toString();
        response.json(result[0]);
    }
    else {
        response.status(404).end();
    }
});
router.post("/", async (request, response) => {
    const body = request.body;
    if (config_1.default.ENV !== "test") {
        const decodedToken = jsonwebtoken_1.default.verify(request.token ?? "", config_1.default.SECRET);
        if (typeof decodedToken === "string") {
            return response.status(400).json({ error: responses_1.default.ERR_TOKEN_INVALID });
        }
        const user = await user_1.default.findById(decodedToken.id);
    }
    const isPersonExist = await person_1.default.findOne({ _id: body.person });
    const isPositionExist = await position_1.default.findOne({ _id: body.position });
    if (isPersonExist === null) {
        return response.status(400).json({ error: responses_1.default.ERR_PERSON_INVALID });
    }
    if (isPositionExist === null) {
        return response.status(400).json({ error: responses_1.default.ERR_POSITION_INVALID });
    }
    const item = new employee_1.default(body);
    const savedItem = await item.save();
    response.status(201).json(savedItem).end();
});
router.post("/clean", async (request, response) => {
    await employee_1.default.deleteMany({});
    response.json(200).end;
});
router.put("/:id", async (request, response) => {
    if (config_1.default.ENV !== "test") {
        const decodedToken = jsonwebtoken_1.default.verify(request.token ?? "", config_1.default.SECRET);
        if (typeof decodedToken === "string") {
            return response.status(400).json({ error: responses_1.default.ERR_TOKEN_INVALID });
        }
    }
    const id = request.params.id;
    const body = request.body;
    const result = await employee_1.default.findOneAndUpdate({ _id: { $eq: id } }, body, {
        new: true,
    });
    response.status(200).json(result);
});
router.delete("/:id", async (request, response) => {
    if (config_1.default.ENV !== "test") {
        const decodedToken = jsonwebtoken_1.default.verify(request.token ?? "", config_1.default.SECRET);
        if (typeof decodedToken === "string") {
            return response.status(400).json({ error: responses_1.default.ERR_TOKEN_INVALID });
        }
    }
    const id = request.params.id;
    const result = await employee_1.default.findOneAndDelete({ _id: { $eq: id } });
    const formattedId = result?._id.toString();
    return response
        .status(204)
        .json(result ? { id: formattedId } : null)
        .end();
});
exports.default = router;
