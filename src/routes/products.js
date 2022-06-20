const express = require("express");
const router = express.Router();
const productController = require('../controller/productsController');

// Rutas de los Productos !!
router.get("/productCart", productController.productCart);
router.get("/detail/:id/", productController.detail);
router.get("/", productController.listAll);
router.get("/category/:category", productController.listCategory);
router.get("/search", productController.listBySearch);
module.exports = router;

  module.exports = router;