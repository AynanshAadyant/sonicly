import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {createSong, getAllSongs, addToPlaylist, getSong, deleteSong} from "../controllers/song.controller.js"
import {upload} from "../middleware/multer.js";

const router = Router();

router.route( "/create" ).post( upload.fields([ 
    { name: "song", maxCount: 1},
    { name: "cover", maxCount: 1}
]), createSong );
router.route( "/get/:id").get( getSong );
router.route( "/:songId/add-to-playlist").post( protectRoute, addToPlaylist );

router.route( "/:id" ).delete( protectRoute, deleteSong );
router.route( "/" ).get( getAllSongs );

export default router;