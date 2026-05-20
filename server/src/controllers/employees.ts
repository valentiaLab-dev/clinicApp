import config from '../config/config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/user'
import Position from '../models/position'
import Person from '../models/person'
import Model from '../models/employee'
import express from 'express';
import responses from '../constants/responses'
import { Request, Response, NextFunction } from 'express'
import { ParsedQs } from 'qs'

const router = express.Router();

interface AuthRequest extends Request {
  token? : string | null;
  query : ParsedQs | {
    filter: ParsedQs 
  };
}

interface DecodedToken extends JwtPayload{
  id? : string
}

router.get("/", async (request:AuthRequest, response) => {
  const query = 'query' in request ? request.query : {}
  const filter = 'filter' in query ? query.filter : {}
  const parsedFilter = typeof filter === 'string' ? JSON.parse(filter) : {};
  const populate = 'populate' in parsedFilter ? parsedFilter.populate : ''
  const collection = await Model.find({}).populate(populate)
  response.setHeader("X-Total-Count","10")
  response.setHeader("Access-Control-Expose-Headers","Content-Range")
  response.setHeader("Content-Range","bytes: 0-9/*")
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

  const result = await Model.find({ _id: id })
  if (result) {
    result[0].id = result[0]._id.   toString()
    response.json(result[0]);
  } else {
    response.status(404).end();
  } 
});

router.post("/", async (request:AuthRequest, response) => {
  const body = request.body;
  if (config.ENV !== "test") {
    const decodedToken:DecodedToken|string = jwt.verify(request.token ?? '', config.SECRET);
    if (typeof decodedToken === 'string') {
      return response.status(400).json({ error: responses.ERR_TOKEN_INVALID});
    }
    const user = await User.findById(decodedToken.id);
  }

  const isPersonExist = await Person.findOne({_id:body.person})
  const isPositionExist = await Position.findOne({_id:body.position})

  if(isPersonExist === null){
    return response.status(400).json({ error: responses.ERR_PERSON_INVALID })
  }

  if(isPositionExist === null){
    return response.status(400).json({ error: responses.ERR_POSITION_INVALID })
  }


  const item = new Model(body);
  const savedItem = await item.save();

  response.status(201).json(savedItem).end();
});

router.post("/clean", async (request, response) => {
  await Model.deleteMany({});
  response.json(200).end;
});

router.put("/:id", async (request:AuthRequest, response) => {
  if (config.ENV !== "test") {
    const decodedToken:DecodedToken|string = jwt.verify(request.token ?? '', config.SECRET);
    if (typeof decodedToken === 'string') {
      return response.status(400).json({ error: responses.ERR_TOKEN_INVALID });
    }
  }

  const id = request.params.id;
  const body = request.body;
  const result = await Model.findOneAndUpdate({ _id: { $eq: id } }, body, {
    new: true,
  });
  response.status(200).json(result);
});

router.delete("/:id", async (request:AuthRequest, response) => {
  if (config.ENV !== "test") {
    const decodedToken:DecodedToken|string = jwt.verify(request.token ?? '', config.SECRET);
    if (typeof decodedToken === 'string') {
      return response.status(400).json({ error: responses.ERR_TOKEN_INVALID });
    }
  }

  const id = request.params.id;
  const result = await Model.findOneAndDelete({ _id: { $eq: id } });

  const formattedId = result?._id.toString();
  return response
    .status(204)
    .json(result ? { id: formattedId } : null)
    .end();
});

export default router;
