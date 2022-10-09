import express from 'express';

import userRouter from './routes/userRoutes.js';
import morgan from "morgan";

const app = express();

//express use*//
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(morgan('dev'))

//routes//
/*app.use("/api/products", productsRouter);*/
app.use('/api/user', userRouter);


export default app;