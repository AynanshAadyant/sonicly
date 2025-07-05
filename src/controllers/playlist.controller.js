import { Playlist } from "../models/playlist.model.js";
import { User } from "../models/user.model.js";

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

    const user = await User.findById( owner._id );
    user.playlists.push( playlist );
    await user.save();

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

const playlistBulkAdd = async( req, res ) => {
    const { name, songs, isPublic } = req.body; //name -> playlist name, songs->array of songs
    const user = req.user;

    if( !name || !songs ) {
        return res.status( 400 ).json( {
            success: false,
            message: "Enter all details",
            status: 400
        })
    }

    const playlist = await Playlist.create( {
        name,
        songs, 
        createdBy : user._id,
        isPublic
    })

    const changeUser = await User.findById( user._id );
    changeUser.playlist.push( playlist );
    await changeUser.save();

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Playlist created successfully"
    })
}

const getAllPlaylist = async( req, res ) => {
    

    const playlists = await Playlist.find( );

    if( playlists.length === 0 ) {
        return res.status( 200 ).json( {
            success: false,
            status: 200,
            playlistPresent: false,
            message: "No playlist created so far"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        playlistPresent: true,
        body: playlists
    })
}

const getPlaylist = async( req,res ) => {
    console.log( "Fetching playlist " );
    const {playlistId} = req.params;

    console.log( "Playlist id : ", playlistId );
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

//default playlists made in application based on various factors - currently genre

const genrePlaylist = async( req, res ) => {
    const { genre } = req.params;
    
    if( !genre ) { 
        return res.status( 404 ).json( {
            success : false,
            status: 404,
            message: "No genre received"
        })
    }

}

export {createPlaylist, addInPlaylist, playlistBulkAdd, getAllPlaylist, getPlaylist, deletePlaylist }