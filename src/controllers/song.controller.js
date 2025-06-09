import {Song} from "../models/song.model.js";
import { uploadSong, uploadCover } from "../utils/cloudinary.js";
import { cloudinary } from "../utils/cloudinary.js";

const createSong = async( req, res ) => {
    const { title, artist, genre, duration } = req.body;
    const owner = req.user;

    if( !title )
        return res.status( 202 ).json( {
            success: false,
            status: 202,
            message: "Title missing"
        })
    if( !artist ) 
        return res.status( 202 ).json( {
            success: false,
            status: 202,
            message: "Artist missing"
        })
    if( !duration ) 
        return res.status( 202 ).json( {
            success: false,
            status: 202,
            message: "Duration missing"
        })

    const songLocal = req.files?.song[0];
    const coverLocal = req?.files?.cover[0] || '../public/cover.jpeg';

    if( !songLocal ) {
        return res.status( 400 ).json( {
            success: false,
            status: 202,
            message: "Song not uploaded"
        })
    }

    const songUrl = await uploadSong( songLocal );

    if( !songUrl ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "Error in uploaded song to cloudinary"
        })
    }
    const coverUrl = await uploadCover( coverLocal );
    if( !coverUrl ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "Error in uploaded cover to cloudinary"
        })
    }

    const song = await Song.create( {
        title,
        artist, 
        genre: genre || "",
        duration,
        fileUrl,
        coverUrl,
        owner
    }
    )

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "Song uploaded successfully"
    })
}

const getAllSongs = async( req, res ) => {
    const songs = await Song.find().sort( { createdAt: -1 } );
    if( songs.length === 0 ) {
        return res.status( 200 ).json( {
            success: true,
            status: 200,
            message: "No Songs uploaded yet",
            body: []
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: songs
    })
}

const getSong = async( req, res ) => {
    const songId = req.params.id;
    if( !songId ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "Improper id given"
        })
    }

    const song = await Song.findById( songId );
    if( !song ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Song not found"
        })
    }

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        body: song
    })
}

const deleteSong = async( req, res ) => {
    const songId = req.params.id;
    if( !songId ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "Improper id given"
        })
    }

    const song = await Song.findById( songId );
    if( !song ) {
        return res.status( 404 ).json( {
            success: false,
            status: 404,
            message: "Song not found"
        })
    }
    await cloudinary.uploader.destroy(song.public_id, { resource_type: "video" });


    const songDelete = await song.deleteOne();

    return res.status( 200 ).json( {
        success: true,
        status:200,
        message: "Song deleted successfully"
    })
}