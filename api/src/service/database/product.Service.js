import db from "../../database/models";

const {Product} = db

class ProductService{

    async getById(idproduct) {
        return await Product.findByPk({
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
              where: { idproduct: idproduct },
              include: [{ association: "categories" }],
            })
        }
    

    async getByName(name) {
        return await Product.findOne({
            where: {name: name},
            attributes: ['idproducts', 'name', 'price']
        });
    }

    async getAll() {
        return await Product.findAll({include: [{ association: "categories" }],
        attributes: [
          "idproducts",
          "imagen",
          "discount",
          "price",
          "description",
          "name",
          "rating",
          "categories_idcategories",
          [sequelize.literal("price-discount*100/price"), "finalPrice"],
        ],
      })
    }

    async create( product ) {
        return await Product.create(product);
    }

    async delete(idproduct) {
        return await Product.destroy({ where: {idproduct:idproduct, deleted_at:null} })
    }

    async update(idproduct){
        await Product.update(idproduct, {
            where: {idproduct:idproduct, deleted_at: null}
        });
    }

}
export default ProductService;