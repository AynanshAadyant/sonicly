//admin roles : manage users, upload songs, make playlists
import { User } from "../models/user.model.js";
import {Playlist} from "../models/playlist.model.js";
import {Song} from "../models/song.model.js";

//admin account routes
const logOutAdmin = async( req, res ) => {
    console.log( "ADMIN logging out" );
    res.clearCookie( "ACCESS_TOKEN", {
        httpOnly: true,
        secure: process.env.STATUS==='production',
        sameSite: 'lax'
    })
    res.clearCookie( "ADMIN_TOKEN", {
        httpOnly: true,
        secure: process.env.STATUS === 'production',
        sameSite:"lax"
    })

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "admin logged out successfully"
    })}


//admin user routes : 
//1. fetch all users
//2. delete a specific user data
const getAllUsers = async( req, res) => {
    
    console.log("Fetching all users in admin dashboard" );

    const users = await User.find();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: users,
        message: "fetching all users successful"
    })
}

const deleteUser = async( req, res ) => {
    try{
        console.log( "deleting user" );
        const { userId } = req.params;
        const currentUser = req.user;
        if( userId == currentUser._id || req.isAdmin )
        {
            console.log( "cannot delete user" );
            return res.status( 200 ).json( {
                success: false,
                status: 200,
                message: "Cannot delete this User as it is an admin and current user" 
            })
        }
        await User.findByIdAndDelete( userId );
        console.log( "deleted user:", userId );
        return res.status( 200 ).json( {
            success: true,
            status: 200,
            message: `User: ${userId} deleted successfully`
        })
    }
    catch( err) {
        console.error( "Something went wrong while deleting users" );
    }
}

const getAllPlaylists = async( req, res ) => {
    const playlists = await Playlist.find();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: playlists,
        message: "Fetching all playlists successful"
    })
}

const deletePlaylist = async( req, res ) => {

    const { playlistId } = req.params;

    await Playlist.findByIdAndDelete( playlistId );

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: `Playlist ${playlistId} deleted successfully.`
    })
}

const getAllSongs = async( req, res ) => {
    const songs = await Song.find();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: songs,
        message: "Fetching all songs successful"
    })
}

const deleteSong = async( req, res ) => {
    const {songId} = req.params;

    await Song.findByIdAndDelete( songId );

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: `Song ${songId} deleted successfully`
    })
}
export { logOutAdmin, getAllUsers, deleteUser, getAllPlaylists,deletePlaylist, getAllSongs, deleteSong }
