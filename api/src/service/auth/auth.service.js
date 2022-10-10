import JWT from 'jsonwebtoken'
import 'dotenv/config'

class AuthService {
  createAccessToken(username, id) {
    return JWT.sign({ username, id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m'
    })
  }
  createRefreshToken(username, id) {
    return JWT.sign({ username, id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '5h'
    })
  }
}

export default AuthService