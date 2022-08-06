import { Router } from "express";
import userController from '../../controller/userControllers'
const userRouter = Router();


userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/create", userController.createUser);
userRouter.put("/update", userController.updateUser);
userRouter.delete("/delete", userController.deleteUser);



export default userRouter;