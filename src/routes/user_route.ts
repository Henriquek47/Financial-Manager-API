import { Router } from "express";
import { GetUserController } from "../modules/user/get/get_user_controller";
import { UpdateWalletController } from "../modules/user/update/update_wallet_controller";

const getUserController = new GetUserController();
const updateWalletController = new UpdateWalletController();

const userRoute = Router();

userRoute.get("/", getUserController.handle);
userRoute.put("/wallet", updateWalletController.handle);

export { userRoute };