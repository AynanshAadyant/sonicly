import { Router } from "express";
import { addInPlaylist, createPlaylist, deletePlaylist, getAllPlaylist, getPlaylist, playlistBulkAdd } from "../controllers/playlist.controller.js";
import { protectRoute} from "../middleware/protectRoute.js"

const router = Router();

router.route("/create").post( protectRoute, createPlaylist);
router.route("/:playlist/add-song").post( protectRoute, addInPlaylist );
router.route("/playlist/create" ).post( protectRoute, playlistBulkAdd );
router.route( "/").get( getAllPlaylist );
router.route( "/:playlistId").get( getPlaylist );
router.route( "/:playlistId" ).delete( deletePlaylist );

export default router;