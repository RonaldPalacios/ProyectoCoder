import JWT from 'jsonwebtoken'
/*import { RESPONSE_MESSAGES } from '../utilities'*/
import 'dotenv/config'

const handleToken = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).json({
      errors: [{ msg: RESPONSE_MESSAGES.TOKEN_NOT_FOUND }]
    })
  } else {
    try {
      let { username, id } = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = { username, id }
      next()
    } catch (e) {
      return res.status(403).json({
        errors: [{ msg: RESPONSE_MESSAGES.INVALID_TOKEN }]
      })
    }
  }
}

export default handleToken
