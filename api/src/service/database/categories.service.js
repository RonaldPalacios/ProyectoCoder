import db from '../../database/models'

const {categories} = db

class CategorieService {

async getAll() {
    return await categories.findAll({ include: [{ association: "products", as: "p" }],
    attributes: ["idcategories", "nombre"],
  })
}
}

export default CategorieService;