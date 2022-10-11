import { ERROR_MESSAGES } from "../utils";
import {UserService, sendMail} from '../service'
import { userAdapter } from '../adapter';
import bcrypt from 'bcryptjs'

const userService = new UserService();

let Users = {
  createUser: async (req, res) => {
    try {
      const user = userAdapter(req.body)
      const userInDb = await userService.getbyEmail(email);
      if (userInDb) {
        return res.sendStatus(200);
      } else {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await userService.create(password, email);
        let subject = "Creacion de usuario";
        sendMail(req.body, subject);
        res.status(200).json({
          status: 200,
          message: 'Se creo el usuario correctamente',
        });
      }
    } catch (e) {
      res.status(500).json({
        message: ERROR_MESSAGES.CONTROLLER_ERROR,
        error: e,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      await UserService.getAll();
      res.status(200).json({
        status: 200,
        user,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error en el intento",
        error: e,
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      let user = await UserService.User.findOne({
        where: { iduser: req.params.id },
      });
      res.status(200).json({
        status: 200,
        user,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error en el intento",
        error: e,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      await UserService.User.update(req.body, {
        where: { iduser: req.params.id },
      });
      res.status(200).json({
        status: 200,
        message: "Se actualizo correctamente",
      });
    } catch (e) {
      res.status(500).json({
        message: "No se proceso la solicitud correctamente",
        error: e,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await UserService.User.destroy({ where: { idusers: req.params.id } });
      res.status(200).json({
        status: 200,
        message: "Usuario elimado correctamente",
      });
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
};

export default Users;
