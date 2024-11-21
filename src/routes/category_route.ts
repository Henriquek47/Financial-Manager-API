import { Router } from "express";
import { PostCategoryController } from "../modules/category/post/post_category_controller";
import { ListCategoryController } from "../modules/category/get/list_category_controller";

const postCategoryController = new PostCategoryController();
const listCategoryController = new ListCategoryController();
 
const categoryRoute = Router();

categoryRoute.post("/", postCategoryController.handle);
categoryRoute.get("/:userId", listCategoryController.handle);
export { categoryRoute };