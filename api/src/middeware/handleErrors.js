import { validationResult } from "express-validator";

const handleErrors = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    next();
  }
};

export default handleErrors;