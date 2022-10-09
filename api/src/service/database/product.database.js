import db from "../../database/models";

const {Product} = db

class ProductService{

    async getById(id) {
        return await db.Product.findByPk(id, {attributes: ['idproduct', 'price', 'name']});
    }

    async getbyEmail(idproduct) {
        return await db.Product.findOne({
            where: {idproduct: idproduct},
            attributes: ['idproduct', 'name', 'price']
        });
    }

    async getAll() {
        return await db.Product.findAll()
    }

    async create( idproduct, name, price) {
        return await db.Product.create({ idproduct, name, price });
    }

    async delete(idproduct) {
        return await db.Product.destroy({ where: {idproduct:idproduct, delete_ad:null} })
    }

    async update(idproduct){
        let {id} = idproduct;
        await db.Product.update(idproduct, {
            where: {idproduct:idproduct, delete_ad: null}
        });
    }

}
export default ProductService;