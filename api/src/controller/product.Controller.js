import ProductService from "../service/database/product.Service";
import { ERROR_MESSAGES } from "../utils";
import { productAdapter } from "../adapter";

const productService = new ProductService();

let Products = {
  getProducts: async (req, res) => {
    try {
      await productService.findAll();

      res.status(200).json({
        status: 200,
      });
    } catch (e) {
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },

  getProductById: async (req, res) => {
    try {
      let product = await db.Product.findOne();

      res.status(200).json({
        status: 200,
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        image: product.image,
      });
    } catch (e) {
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const product = productAdapter(req.body)
      
      console.log('paso 1')
      const productInDb = await productService.getByName(product.name);
      console.log("Paso 2")
      if (productInDb) {
        return res.sendStatus(200);
      } else {
        delete product.categories;
        console.log(product);
        await productService.create(product);
        console.log('paso 3')
        res.status(200).json({
          status: 200,
          message: "Se creo exitosamente!",
        });
      }
    } catch (e) {
      console.log('paso 4')
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      })
    } 
  },
  updateProduct: async (req, res) => {
    try {
      await productService.update(req.body, {
        where: { idproducts: req.params.id },
      });
      res.status(200).json({
        status: 200,
        message: "Se actualizo exitosamente!",
      });
    } catch (e) {
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await productService.destroy({ where: { idproducts: req.params.id } });
      res.status(200).json({
        status: 200,
        message: "El producto se elimino correctamente",
      });
    } catch (e) {
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      })
    }
  },
};

export default Products;
