import { Playlist } from "../models/playlist.model.js";

const createPlaylist = async( req, res ) => {
    const { name, songId, isPublic = true } = req.body;
    const owner = req.user;

    if( !name || !songId ) {
        return res.status( 400 ).json({
            success: false,
            status: false,
            message: "Missing fields"
        })
    }

    let songArray = [];
    songArray.push( songId );
    
    const playlist = await Playlist.create( {
        name, 
        createdBy: owner,
        songs: songArray,
        isPublic
    }) 

    return res.status( 201 ).json( {
        success: true,
        status: 201,
        message: "Playlist created successfully"
    })
}

const addInPlaylist = async( req, res ) => {
    const { song } = req.body;
    const playlistId = req.params.playlist;
    const user = req.user;

    const playlist = await Playlist.findOne( {
        _id: playlistId,
        createdBy: user
    } );

    if( !playlist ) {
        return res.status(404 ).json( {
            success: false,
            status: 404,
            message: "Playlist not found"
        })
    }

    //checking if song already added
    if( playlist.songs.includes( song ) )
    {
        return res.status( 409 ).json( {
            success: false,
            status: 409,
            message: "Song already added"
        })
    }

    playlist.songs.push( song );

    await playlist.save();

    return res.status( 200 ).json( {
        status: 200,
        success: true,
        message: "Playlist updated successfullu"
    })
}

const getAllPlaylist = async( req, res ) => {
    const user = req.user;
    const playlists = await Playlist.find( { createdBy: user._id } );

    if( playlists.length === 0 ) {
        return res.status( 200 ).json( {
            success: true,
            status: 200,
            message: "No playlist created so far"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: playlists
    })
}

const getPlaylist = async( req,res ) => {
    const user = req.user;
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findById( playlistId );

    if( !playlist ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Playlist not found"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: playlist
    })
}

const deletePlaylist = async( req, res ) => {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findById( playlistId );
    if( !playlist ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Playlist not found"
        })
    }

    await playlist.remove();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Playlist deleted successfully"
    })
}

export {createPlaylist, addInPlaylist, getAllPlaylist, getPlaylist, deletePlaylist }