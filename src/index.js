import express from 'express';
import dotenv from 'dotenv';
import { notFoundHandler, errorHandler } from './middlewares/errorMiddlewares.js'

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Testing OK'
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.info(`Server is running at port ${port}`));
