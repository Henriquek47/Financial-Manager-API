import { Router } from "express";
import { GetMonthSummaryController } from "../modules/financial/get/get_month_summary_controller";
import { GetSpendingController } from "../modules/financial/get/get_spending_controller";

const getMonthSummaryController = new GetMonthSummaryController();
const getSpendingController = new GetSpendingController();
  
const financialRoute = Router();

financialRoute.get("/summary/:userId", getMonthSummaryController.handle);
financialRoute.get("/:userId", getSpendingController.handle);
 export { financialRoute };