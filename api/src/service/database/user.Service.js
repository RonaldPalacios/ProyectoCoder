import db from "../../database/models";

const {User} = db

class UserService {

    async getById(id) {
        return await db.User.findByPk(id, {attributes: ['username', 'password', 'id']});
    }

    async getbyEmail(email) {
        return await db.User.findOne({
            where: {email: email},
            attributes: ['email', 'password']
        });
    }

    async getAll() {
        return await db.User.findAll()
    }

    async create( password, email) {
        return await db.User.create({ password, email });
    }

    async delete(id) {
        return await db.User.destroy({ where: {id:id, deleted_at:null} })
    }

    async update(user){
        let {id} = user;
        await db.User.update(user, {
            where: {id:id, deleted_at: null}
        });
    }

}
export default UserService;