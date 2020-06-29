import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
});

module.exports = mongoose.model('User', userSchema);
// export default User;
