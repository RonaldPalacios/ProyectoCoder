const res = require("express/lib/response");
const fs = require("fs");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;


const productController = { //creo un controlador para todas las vistas de productos

  productCart: (req, res) => {
    let productData = [{
        src: "../img/products/mesa1.jpg",
        precioAnt: 30785,
        precio: 27690,
        nombre: "mesa Gamer",
      },
      {
        src: "../img/products/sillas1.jpg",
        precioAnt: 30785,
        precio: 27690,
        nombre: "Silla Gamer",
      },
    ];
    res.render("product/productCart", {
      data: productData
    });
  },
  detail: async (req, res) => { //detalle de los productos
    try {
      let product = await db.Product.findOne({
      attributes: [
        "idproducts",
        "image",
        "discount",
        "price",
        "description",
        "name",
        "rating",
        "categories_idcategories",
        [sequelize.literal("price-discount*100/price"), "finalPrice"],
      ],
      where: {idproducts: req.params.id},
      include: [{association: 'categories' }],
     });   
     let category = await db.Product.findAll({
        attributes: [
          "idproducts",
          "image",
          "discount",
          "price",
          "description",
          "name",
          "rating",
          "categories_idcategories",
          [sequelize.literal("price-discount*100/price"), "finalPrice"],
        ],
        where: { categories_idcategories: product.categories_idcategories },
        limit: 4,
      });     
   res.render('product/detail', {product, sameCategory : category})
    }catch(e) {
      res.send('error:'+ e);
  }
  },
  listAll: async(req, res) => { //todas los productos
    try{
      let category = await db.Product.findAll({
        include: [{ association: "categories" }],
        group: ["categories_idcategories"],
        attributes: [
          "categories_idcategories",
         [ sequelize.fn("count", sequelize.col("categories_idcategories")),
         
         "count_cats",
        ],
      ],
      })
      let product = await db.Product.findAll({
        include: [{ association: "categories" }],
        attributes: [
          "idproducts",
          "image",
          "discount",
          "price",
          "description",
          "name",
          "rating",
          "categories_idcategories",
          [sequelize.literal("price-discount*100/price"), "finalPrice"],
        ],
      })
      res.render("product/products", {
        data: product,
        filtro: "Todos los productos",
        categories: category,
      });

    }catch (e){
      res.send('error:'+ e);
    }
  
  },
  listCategory: async (req, res) => {
    try {
      let category = await db.Product.findAll({
        include: [{ association: "categories" }],
        group: ["categories_idcategories"],
        attributes: [
          "categories_idcategories",
          [
            sequelize.fn("count", sequelize.col("categories_idcategories")),
            "count_cats",
          ],
        ],
      })
      let product = await db.Product.findAll({
        include: [{ association: "categories" }],
        attributes: [
          "idproducts",
          "image",
          "discount",
          "price",
          "description",
          "name",
          "rating",
          "categories_idcategories",
          [sequelize.literal("price-discount*100/price"), "finalPrice"],
        ],
        where: { categories_idcategories: req.params.category },
      })
      res.render("product/products", {
        data: product,
        filtro: products[0].categories.dataValues.nombre,
        categories: category,
      });
    }catch (e){
      res.send('error:'+ e);
    }
  },

  listBySearch: async (req, res) => { //Search
   try {
      let category = await db.Product.findAll({
        include: [{ association: "categories" }],
        group: ["categories_idcategories"],
        attributes: [
          "categories_idcategories",
          [
            sequelize.fn("count", sequelize.col("categories_idcategories")),
            "count_cats",
          ],
        ],
         })
         let product = await db.Product.findAll({
          where: {
            name: {
              [Op.like]: "%" + req.query.keywords + "%",
            },
          },
          attributes: [
            "idproducts",
            "image",
            "discount",
            "price",
            "description",
            "name",
            "rating",
            "categories_idcategories",
            [sequelize.literal("price-discount*100/price"), "finalPrice"],
          ],
         })
         res.render("product/products", {
          data: product,
          filtro: req.query.keywords,
          categories: category,
        });
   }catch(e) {
    res.send('error:'+ e);
   };
   
  }
};

module.exports = productController;