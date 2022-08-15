import db from '../database/models';
import sendMail from "../service/mail";

module.exports = {
    getUsers: async (req, res) => {
        try {
            let users = await db.User.findAll();
            res.status(200).json({
                count: users.leght,
                users,
            }); 
        }catch(e){
            res.status(500).json({
                message: 'Error en el intento',
                error: e,
            });
        }
    },
    getUserById: async(req, res)=>{
        try{
            let user = await db.User.findOne ({where: {iduser: req.params.id}});
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
    createUser: async (req, res)=> {
        try{
            console.log(req.body)
            await db.User.create(req.body);
            let subject = "Creacion de usuario";
            sendMail(req.body, subject);
            res.status(200).json({
                status:200,
                message: 'Se creo el usuario correctamente',
            });
        }catch(e){
            res.status(500).json({
                message: 'No se pudo crear el usuario',
                error: e,
            });
        }
    },
    updateUser: async (req, res)=>{
        try{
            await db.User.update(req.body, {where: {iduser: req.params.id}});
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
         await db.User.destroy({ where: { idusers: req.params.id } })
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