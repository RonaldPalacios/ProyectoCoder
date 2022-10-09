import { check } from "express-validator";

const userValidations = {
  create: [
    /*check("first_name").exists().notEmpty().trim().escape(),
    check("last_name").exists().notEmpty().trim().escape(),*/
    check("email").exists().notEmpty().isEmail().trim().escape(),
   
    check("password").exists().notEmpty().trim().escape(),
  ],
};

export default userValidations;