import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
//now since our url hits /user so control is given to the userroutes now if furthurmore /register is hit then our controller which consist of the function registeruser that function will be executed!


export default router;