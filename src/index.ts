import express from "express";
import 'express-async-errors';
import dotenv from 'dotenv';
import { routes } from "./routes/router";
import { errorMiddlewares } from "./middlewares/error_middlewares";
 
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const port = process.env.PORT || 3333;


const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddlewares);

app.listen(port, () => {
    console.log('Server running on http://0.0.0.0:3333');
  });
