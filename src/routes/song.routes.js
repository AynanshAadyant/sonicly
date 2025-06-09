import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute";
import {createSong, getAllSongs, addToPlaylist, getSong, deleteSong} from "../controllers/song.controller.js"

const router = Router();

router.route( "/create" ).post( protectRoute, createSong );
router.route( "/:songId/add-to-playlist").post( protectRoute, addToPlaylist );
router.route( "/" ).get( getAllSongs );
router.route( "/get/:id").get( getSong );
router.route( "/:id" ).delete( protectRoute, deleteSong );

export default router;