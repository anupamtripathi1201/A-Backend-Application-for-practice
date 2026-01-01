import {Router} from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
//now since our url hits /user so control is given to the userroutes now if furthurmore /register is hit then our controller which consist of the function registeruser that function will be executed!


//now we will register a login route

router.route('/loginUser').post(loginUser);

export default router;