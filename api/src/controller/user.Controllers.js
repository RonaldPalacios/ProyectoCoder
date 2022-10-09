import UserService from '../service/database/user.database';
import { ERROR_MESSAGES } from "../utils";
import sendMail from "../service/mail";

const userService = new UserService();

let Users = {
    createUser: async(req, res) => {
        try {
            const { password, email} = req.body;
            console.log("Paso 1")
            const userInDb = await userService.getbyEmail(email);
            console.log("Paso 2")
            if (userInDb) {
                return res.sendStatus(200);
            } else {
                console.log("Paso 3")
                await userService.create( password, email);
                console.log("Paso 4")
                sendMail(email, "Creación de usuario");
                console.log("Paso 5")
                return res.sendStatus(201);
            }
        } catch (e) {
            res.status(500).json({
                message: ERROR_MESSAGES.CONTROLLER_ERROR,
                error: e,
            });
        }
    },
    getAll: async(req , res)=>{
        try {
           await UserService.getAll()
            res.status(200).json({
                status: 200,
                user,
               }) 
        } catch (e) {
            res.status(500).json({
                message: 'Error en el intento',
                error: e,
            });
        }
    },
    getUserById: async(req, res)=>{
        try{
            let user = await UserService.User.findOne ({where: {iduser: req.params.id}});
           res.status(200).json({
            status: 200,
            user,
           }) 
        }catch(e){
            res.status(500).json({
                message: 'Error en el intento',
                error: e,
            });
        }
    },
    
    updateUser: async (req, res)=>{
        try{
            await UserService.User.update(req.body, {where: {iduser: req.params.id}});
            res.status(200).json({
               status: 200,
               message: 'Se actualizo correctamente',     
            })

        }catch(e){
            res.status(500).json({
                message: 'No se proceso la solicitud correctamente',
                error: e,
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
         await UserService.User.destroy({ where: { idusers: req.params.id } })
         res.status(200).json({
          status: 200,
          message: "Usuario elimado correctamente"
        })
        } catch (e) {
          res.status(500).json({
            message: "Ocurrio un error:",
            error: e,
          });
        }
      },
    // sendWelcomeEmail: (req, res) => {
    //     let user = db.User.findOne({
    //         attributes: ["first_name", "last_name", "phone", "email"]
    //     })
        
    //     let subject = "Creacion de usuario";
    //     sendMail(user, "welcome", subject);
    //     res.sendStatus(200)
    // }
};

export default Users;