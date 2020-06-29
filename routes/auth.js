import app from 'express';
import { Auth } from '../app/controllers';

const router = app.Router();

router.post('/signup', Auth.signup);
router.post('/login', Auth.login)

export default router;