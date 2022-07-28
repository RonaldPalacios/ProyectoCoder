import express from 'express';
import productRouter from "./v1/routes/productsRouter.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
console.log(`API is listening on port ${PORT}`);
});

app.use("/products", productRouter);