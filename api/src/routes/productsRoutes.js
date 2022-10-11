import { Router } from "express";
import controller from "../controller/product.Controller";
import productValidations from "../middeware/validations/product.Validations";
const router = Router();



router.get(
    "/:id",
    controller.getProductById
);

router.get("/inSale/:limit?",
    controller.getProductsInSale
);

router.get("/order/:orderBy/:order/:limit?",
    controller.getProductsOrdered
);
router.get("/:limit?/:inSale?",
    controller.getProducts
);
router.get("/search/:keywords/:orderBy?/:order?",
    controller.searchProducts
);
router.get("/categories/list",
    controller.getCategories
);
router.get("/category/:idCategory/:limit?",
    controller.getProductsByCategory
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