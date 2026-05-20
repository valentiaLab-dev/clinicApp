import config from '../config/config'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/user'
import express , { Request, Response, NextFunction } from 'express';
import responses from '../constants/responses'

const router = express.Router();

interface User {
  passwordHash : string | null
}


router.post("/", async (request, response) => {
  
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const hash = (user !== null && 'passwordHash' in user && user.passwordHash !== undefined) ? user.passwordHash : ''
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, hash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  let token = jwt.sign(userForToken, config.SECRET);

  if(config.ENV === 'production'){
       // token expires in 60*60 seconds
    token = jwt.sign(
        userForToken,
        config.SECRET,
        { expiresIn: 60*60 }
    )
  }

  response
    .status(200)
    .send({ token, username: user.username, access: user.access });
});

export default router;