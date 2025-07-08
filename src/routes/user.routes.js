import { Router  } from "express";
import registerUser from "../controllers/user.controller";



const router = Router();
router.route('/register')
  .post(registerUser);

export const userRoutes = router;