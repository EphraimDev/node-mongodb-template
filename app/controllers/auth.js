const User = require('../models/User');
import HashPassword from '../middlewares/hashPassword';
import Authenticate from '../middlewares/authenticate';
import ComparePassword from '../middlewares/comparePassword';

class AuthController {
  static async signup(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: 'Email or password is missing' });
      }

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ success: false, message: 'Email has been used already' });
      }

      const hashPassword = await HashPassword(password);
      user = new User({
        email,
        password: hashPassword,
      });

      await user.save();
      const token = await Authenticate(user);
      return res
        .status(201)
        .json({ success: true, user, token, message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: 'Email or password is missing' });
      }

      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User does not exist' });
      }

      const match = await ComparePassword(password, user.password);
      if (!match) {
        return res
          .status(401)
          .json({ success: false, message: 'incorrect email or password' });
      }

      const token = await Authenticate(user);

      return res.status(200).json({ user, token, success: true, message: 'User login successful' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default AuthController;