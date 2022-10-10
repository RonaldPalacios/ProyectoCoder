import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import { RESPONSE_MESSAGES } from '../utilities'
import { TokenService, AuthService, UserService } from '../service'
import 'dotenv/config'
import { userAdapter } from '../__adapter__'

const tokenService = new TokenService()
const authService = new AuthService()
const userService = new UserService()

export default {
  login: async (req, res) => {
    try {
      const { username, password } = req.body
      const userInDb = await userService.findByUsername(username)
      if (!userInDb) {
        return res.sendStatus(404)
      }
      const isMatch = await bcrypt.compare(password, userInDb.password)
      if (!isMatch) {
        return res.status(401).json({
          msg: RESPONSE_MESSAGES.CREDENTIALS_ERROR
        })
      }
      const accessToken = authService.createAccessToken(username, userInDb.id)
      const refreshToken = authService.createRefreshToken(username, userInDb.id)
      await tokenService.storeToken(refreshToken)
      return res.status(200).json({
        accessToken,
        refreshToken
      })
    } catch (err) {
      return res.status(500).json({
        msg: RESPONSE_MESSAGES.CONTROLLER_ERROR,
        error: err
      })
    }
  },
  logout: async (req, res) => {
    try {
      const { refreshToken } = req.body
      await tokenService.deleteToken(refreshToken)
      res.sendStatus(200)
    } catch (err) {
      return res.status(500).json({
        msg: RESPONSE_MESSAGES.CONTROLLER_ERROR,
        error: err
      })
    }
  },
  refresh: async (req, res) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        return res.status(401).json({
          msg: RESPONSE_MESSAGES.TOKEN_NOT_FOUND
        })
      }
      let token = await tokenService.getToken(refreshToken)
      if (!token) {
        return res.status(403).json({
          msg: RESPONSE_MESSAGES.INVALID_TOKEN
        })
      }
      const user = JWT.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET)
      const { username, id } = user
      const newAccessToken = JWT.sign(
        { username, id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
      )
      return res.status(200).json({
        accessToken: newAccessToken
      })
    } catch (err) {
      return res.status(500).json({
        msg: RESPONSE_MESSAGES.CONTROLLER_ERROR,
        error: err
      })
    }
  }
}