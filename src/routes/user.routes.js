import { Router } from "express";
import { createUser, getUser, loginUser, logOut } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.route( "/signup" ).post( createUser);
router.route( "/login" ).post( loginUser );
router.route( "/current" ).get( protectRoute, getUser );
router.route( "/logout" ).post( logOut );

export default router;