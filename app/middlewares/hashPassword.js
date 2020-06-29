import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

const hash = async (plainTextPassword) => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hashPassword = await bcrypt.hash(plainTextPassword, salt);

  return hashPassword;
};

export default hash;