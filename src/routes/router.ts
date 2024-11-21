import { Router } from "express";
import { authRoute } from "./auth_route";
import { userRoute } from "./user_route";
import { authMiddleware } from "../middlewares/auth_middleware";
import { categoryRoute } from "./category_route";
import { transactionRoute } from "./transaction_route";
import { financialRoute } from "./financial_route";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/user", authMiddleware, userRoute);
routes.use("/category", authMiddleware, categoryRoute);
routes.use("/transaction", authMiddleware, transactionRoute);
routes.use("/financial",authMiddleware, financialRoute);

export { routes };