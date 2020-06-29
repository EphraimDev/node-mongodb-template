import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes'

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

import './config/database';

app.get('/', (_req, res) => {
  res.send('A template for nodejs-mongodb app');
});

app.use('/api/v1', routes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

export default app;
