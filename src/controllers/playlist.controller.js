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

const addToPlaylist = async( req, res ) => {
    const { name } = req.body;
    const song = req.params.song;
    const user = req.user;

    const playlist = await Playlist.findOne( {
        name: name,
        createdBy: user._id
    })

    if( !playlist ) {
        return res.status(400 ).json( {
            success: false,
            status: 400,
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