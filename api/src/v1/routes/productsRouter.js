import { Router } from "express";

const productRouter = Router();


productRouter.get("/", (req, res) => { 
    res.send("<h2>It's Working New Product!</h2>"); 
});

export default productRouter;