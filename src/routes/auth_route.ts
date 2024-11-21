import { Router } from "express";
import { SignUpController } from "../modules/auth/sign_up/sign_up_controller";
import { SignInController } from "../modules/auth/sign_in/sign_in_controller";

const signUpController = new SignUpController();
const signInController = new SignInController();

const authRoute = Router();

authRoute.post("/sign_up", signUpController.handle);
authRoute.post("/sign_in", signInController.handle);

export { authRoute };