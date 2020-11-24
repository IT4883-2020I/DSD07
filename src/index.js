import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { notFoundHandler, errorHandler } from './middlewares/errorMiddlewares.js'
import connectDB from './config/db.js';
import routes from './routes/index.js';

const __dirname = path.resolve();
dotenv.config({ path: `${__dirname}/.env` });

connectDB();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to DSD07 APIs: Reporting and Statistics');
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.info(`Server is running at port ${port}`));
