import { body } from "express-validator";

export default [
  body("name").notEmpty().bail(),
  body("price").notEmpty().bail(),
  body("discount").notEmpty().bail(),
  body("description").notEmpty().bail(),
  body("categories").notEmpty().bail(),
];
