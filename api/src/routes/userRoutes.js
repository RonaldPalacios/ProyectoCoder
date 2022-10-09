import { Router } from "express";
import { handleErrors, userValidations } from "../middeware";
import controller from "../controller/user.Controllers";
const router = Router();

router.post(
    "/create",
    userValidations.create,
    handleErrors,
    controller.createUser
);
router.get(
    "/user",
    handleErrors,
    controller.getAll
);
router.get(
    "/user/:id",
    handleErrors,
    controller.getUserById
);
router.put(
    "/user/:id",
    handleErrors,
    controller.updateUser
);
router.delete(
    "/user/delete/:id",
    handleErrors,
    controller.deleteUser
)


export default router;