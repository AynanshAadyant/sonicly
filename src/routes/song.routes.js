import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute";
import createSong from "../controllers/song.controller.js"

const router = Router();

router.route( "/create" ).post( protectRoute, createSong );
router.route( "/getAll" ).get( );