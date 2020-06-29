const jwt = require('jsonwebtoken');
import dotenv from 'dotenv'
dotenv.config();

const authenticate = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    time: new Date(),
  };
  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return token;
};

export default authenticate;
