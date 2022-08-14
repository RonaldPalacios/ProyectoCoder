import { Router } from "express";
import productcontroller from "../../controller/productController"
const productsRouter = Router();


productsRouter.get("/", productcontroller.getProducts);
productsRouter.get("/:id", productcontroller.getProductById);
productsRouter.post("/create", productcontroller.createProduct);
productsRouter.put("/update/:id", productcontroller.updateProduct);
productsRouter.delete("/delete/:id", productcontroller.deleteProduct);


export default productsRouter;