import bcrypt from 'bcrypt';

const compare = async (plainTextPassword, hashedPassword) => {
  const match = await bcrypt.compareSync(plainTextPassword, hashedPassword);

  return match;
};

export default compare;