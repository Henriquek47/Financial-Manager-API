import { Router } from "express";
import { PostTransactionController } from "../modules/transaction/post/post_transaction_controller";
import { ListTransactionController } from "../modules/transaction/get/list_transaction_controller";

const postTransactionController = new PostTransactionController();
const getTransactionController = new ListTransactionController();
 
const transactionRoute = Router();

transactionRoute.post("/", postTransactionController.handle);
transactionRoute.post("/get", getTransactionController.handle);
export { transactionRoute };