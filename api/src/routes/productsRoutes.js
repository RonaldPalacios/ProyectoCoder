import { Router } from "express";
import controller from "../controller/product.Controller";
import productValidations from "../middeware/validations/product.Validations";
const router = Router();


router.get(
    "/", 
    controller.getProducts
    );

router.get(
    "/:id", 
    controller.getProductById
    );
router.post(
    "/create", 
    productValidations,
    controller.createProduct
    );
router.put(
    "/update/:id",
    controller.updateProduct
    );
router.delete(
    "/delete/:id", 
    controller.deleteProduct
    );


export default router;