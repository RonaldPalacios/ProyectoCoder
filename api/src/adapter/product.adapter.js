export default (objeto) => {
    return {
        name: objeto.name,
        price:objeto.price,
        discount: objeto.discount,
        description:objeto.description,
        categories: objeto.categories
    }
}