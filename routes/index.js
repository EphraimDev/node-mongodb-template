import app from 'express';
import Auth from './auth';

const router = app.Router();

router.use('/', Auth);

export default router;