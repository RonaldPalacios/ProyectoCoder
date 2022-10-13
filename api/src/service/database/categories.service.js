import db from '../../database/models'

const {Categories} = db

class CategorieService {

async findAll() {
    return await Categories.findAll({ 
      include: [{ association: "products", as: "p" }],
      attributes: ["idcategories", "nombre"],
  })
}
}

export default CategorieService;