const db = require("../database/models");
const sequelize = db.sequelize;

const otherController = {
  main: async (req, res) => {
    try{
      let product = await db.Product.findAll({
        limit: 4,
      include: [{ association: "categories" }],
      attributes: [
        "idproducts",
        "image",
        "discount",
        "price",
        "description",
        "name",
        "rating",
        [sequelize.literal("price-discount*100/price"), "finalPrice"],
      ],
    })
    res.render("others/main", { data: product });
      
    }catch(e){
      res.send('error:'+ e);
    }
  },
    contact: (req, res) => {
      res.render("others/contact");
    }, 
};

module.exports = otherController;