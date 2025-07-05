import {Router} from "express"
import { getAllPlaylists, getAllSongs, getAllUsers, deleteUser, deletePlaylist, deleteSong, logOutAdmin } from "../controllers/admin.controller.js";
import {protectAdmin} from "../middleware/admin.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.route( "/admin/logout" ).post( protectRoute, protectAdmin, logOutAdmin );

router.route( "/users" ).get(  protectRoute, protectAdmin, getAllUsers );
router.route( "/users/:userId").delete( protectRoute, protectAdmin, deleteUser );
router.route( "/playlists" ).get(  protectRoute, protectAdmin, getAllPlaylists );
router.route( "/playlists/:playlistId" ).delete( protectRoute, protectAdmin, deletePlaylist );
router.route( "/songs" ).get( protectRoute, protectAdmin, getAllSongs );
router.route( "/songs/:songId" ).delete( protectRoute, protectAdmin, deleteSong );

export default router;