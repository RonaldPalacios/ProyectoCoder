import express from 'express';
import productsRouter from "./v1/routes/productsRoutes";
import userRouter from './v1/routes/userRoutes.js';

const app = express();

app.use("/api/products", productsRouter);
app.use('/api/user', userRouter);

export default app;