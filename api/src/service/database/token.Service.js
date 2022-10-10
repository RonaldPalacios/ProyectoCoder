import db from '../../database/models'

class TokenService {
  async getToken(token) {
    return await db.Token.findOne({ where: { token: token } })
  }

  async storeToken(token) {
    await db.Token.create({ token: token })
  }

  async deleteToken(token) {
    await db.Token.destroy({ where: { token: token }, force: true })
  }
}

export default TokenService