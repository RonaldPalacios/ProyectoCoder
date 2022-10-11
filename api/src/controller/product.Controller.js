import { ERROR_MESSAGES } from "../utils";
import { productAdapter } from "../adapter";
import {ProductService, CategorieService} from '../service/database'

const productService = new ProductService();
const categorieService = new CategorieService();

let Products = {

  getProductById: async (req, res) => {
    try {
      let product = await productService.findOne();

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

      const productInDb = await productService.getByName(product.name);

      if (productInDb) {
        return res.sendStatus(200);
      } else {
        delete product.categories;
        console.log(product);
        await productService.create(product);
        res.status(200).json({
          status: 200,
          message: "Se creo exitosamente!",
        });
      }
    } catch (e) {

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
  getProducts: async (req, res) => {
    try {
      let products = await productService.getAll();
      let categories = await categorieService.getAll()
       
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
      });
      res.status(200).json({
        status: 200,
        countProducts: products.length,
        countCategories: categories.length,
        products,
        categories,
      });
    } catch (e) {
     
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },
  getProductsInSale: async (req, res) => {
    try {
      let products = await productService.getdAll();
      let categories = await categorieService.getdAll();
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
      });
      res.status(200).json({
        status: 200,
        countProducts: products.length,
        countCategories: categories.length,
        products,
        categories,
      });
    } catch (e) {
      
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },

  getProductsOrdered: async (req, res) => {
    try {
      console.log('Paso 1');
      let products = await productService.getAll();
      console.log('Paso 1.5');
      let categories = await categorieService.getAll();
      console.log('Paso 2');
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
        console.log('Paso 3');
      });
      res.status(200).json({
        status: 200,
        countProducts: products.length,
        countCategories: categories.length,
        products,
        categories,
        
      });console.log('Paso 4');
    } catch (e) {
      
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },
  getProductsByCategory: async (req, res) => {
    try {
      let products = await productService.getAll();
      let categories = await categorieService.getAll();
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
      });
      res.status(200).json({
        status: 200,
        category: products[0].categories.nombre,
        countProducts: products.length,
        products: products,
        categories,
      });
    } catch (e) {
      
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },
  searchProducts: async (req, res) => {
    try {
      let products = await productService.getAll();
      let categories = await categorieService.getAll();
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
      });
      res.status(200).json({
        status: 200,
        countProducts: products.length,
        countCategories: categories.length,
        products,
        categories,
      });
    } catch (e) {
      
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },
  getCategories: async (req, res) => {
    try {
      let categories = await categorieService.getAll();
      res.status(200).json({
        categories,
        status: 200,
      });
    } catch (e) {
      
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },
};

export default Products;
