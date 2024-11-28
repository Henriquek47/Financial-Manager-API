import { Router } from "express";
import { GetMonthSummaryController } from "../modules/financial/get/get_month_summary_controller";
import { GetSpendingController } from "../modules/financial/get/get_spending_controller";
import { ListExpensesCategoryController as GetExpensesCategoryController } from "../modules/category/get/list_expenses_categories_controller";

const getMonthSummaryController = new GetMonthSummaryController();
const getSpendingController = new GetSpendingController();
const getExpensesCategoriesController = new GetExpensesCategoryController();
  
const financialRoute = Router();

financialRoute.get("/summary/:userId", getMonthSummaryController.handle);
financialRoute.get("/:userId", getSpendingController.handle);
financialRoute.get("/categories/expenses", getExpensesCategoriesController.handle);
 export { financialRoute };