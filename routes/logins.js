import { Router } from "express";
const router = Router(); // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  getLogin,
  getLogins, 
  createLogin,
  upDateLogin,
  deleteLogin,
} from "../controllers/logins.js";

router.route("/").get(getLogins).post(createLogin);
router.route("/:id").put(upDateLogin).delete(deleteLogin).get(getLogin);


export default router; 