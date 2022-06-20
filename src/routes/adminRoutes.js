const express = require("express");
const router = express.Router();
const adminController = require('../controller/adminControllers');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/img/products"));
    },
    filename: (req, file, cb) => {
      const newfilename =
        "product" + "-" + Date.now() + path.extname(file.originalname);
      cb(null, newfilename);
    },
  });
  let upload = multer({ storage });
  
  router.get("/", adminController.index);
  router.get("/products", adminController.products);
  router.get("/products/search", adminController.searchProducts);
  router.post(
    "/products/",
    upload.single("image"),
    adminController.createProduct
  );
  router.get("/products/edit/:id", adminController.editProduct);
  router.put(
    "/products/update/:id",
    upload.single("image"),
    adminController.updateProduct
  );
  router.get("/products/delete/:id", adminController.confirmDeleteProduct);
  router.delete("/products/delete/:id", adminController.deleteProduct);
  router.get("/users", adminController.users);

module.exports = router;
