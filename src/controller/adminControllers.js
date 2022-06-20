const db = require("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

function getOrder(params) {
  if (params.order) {
    return [[params.order, "ASC"]];
  }
}

const adminController = {
  index: async (req, res) => {
    try {
      let product = await db.Product.findAll({
        order: [["idproducts", "DESC"]]
      })
     /*let users = await db.Users.findAll({
        attributes: [
          [sequelize.fn("count", sequelize.col("idusers")), "count_users"],
        ],
      })*/
      let url = req.url;
      res.render("adm-dashboard/index", { url, product, /*users*/ });
    }catch (e){
      res.send('error:'+ e);
    }
  },
  products: async (req, res) =>{
    try{
      let product = await db.Product.findAll({
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
        include: [{ association: "categories" }],
      })
      let category = await db.Category.findAll()   
      
      res.render("adm-dashboard/products.ejs", {
        url: req.url,
        products: product,
        categories: category,
      });

    }catch(e){
      res.send('error:'+ e);
    }
  },
  searchProducts: async (req, res) => {
    try {
      let product = await db.Product.findAll({
        attributes: [
          "idproducts",
          "image",
          "discount",
          "price",
          "name",
          "categories_idcategories",
          [sequelize.literal("price-discount*100/price"), "finalPrice"],
        ],
        where: {
          name: {
            [Op.like]: "%" + req.query.keywords + "%",
          },
        },
        order: getOrder(req.query),
        include: [{ association: "categories" }],
      })
      let category = await db.Category.findAll()
      res.render("adm-dashboard/products.ejs", {
        url: req.url,
        products: product,
        categories: category,
      });
    }catch(e){
      res.send('error:'+ e);
    }
  },
  createProduct: async (req, res) =>{
    try{
      if (req.file != undefined) {
        req.body.image = req.file.filename;
      }   
    await  db.Product.create(req.body)
    res.redirect("/admin/products")
    }catch(e){
      res.send('error:'+ e);
    }
  },
  editProduct: async (req, res) => {
    try{
      let product = await db.Product.findOne ({
        where: { idproducts: req.params.id },
        include: [{ association: "categories" }],
        attributes: [
          "idproducts",
          "image",
          "discount",
          "price",
          "description",
          "name",
          "categories_idcategories",
        ],
      })
      let category = await db.Category.findAll()
      res.render("adm-dashboard/editProduct", {
        product,
        url: req.url,
        categories: category,
      });
    }catch(e){
      res.send('error:'+ e);
    }
  },
  updateProduct: async (req, res) => {
    try{
      if (req.file != undefined) {
        req.body.image = req.file.filename;
      } else {
        delete req.body.image;
      }
      await db.Product.update(req.body, {where: { idproducts: req.params.id }})
      res.redirect("/admin/products")
    }catch(e) {
      res.send('error:'+ e);
    }
  },
  confirmDeleteProduct: async (req, res) => {
    try{
      let product = await db.Product.findOne({
        where: { idproducts: req.params.id },
      attributes: ["name", "idproducts"],
      })
      res.render("./adm-dashboard/confirmDelete", { url: req.url, product });

    }catch(e){
      res.send('error:'+ e);
    }
  },
  deleteProduct: async (req, res) =>{
    try {
      await db.Product.destroy({ where: { idproducts: req.params.id } })
      res.redirect("/admin/products");
    }catch (e){
      res.send('error:'+ e);
    }
  },
  users: async (req, res) => {
    try{
    let user = await  db.User.findAll()
    res.render("adm-dashboard/users.ejs", { url: req.url, user });
  }catch(e){
    res.send('error:'+ e);
  }
},
};

module.exports = adminController;
