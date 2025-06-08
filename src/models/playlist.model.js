import mongoose from "mongoose";

const Playlist = new mongoose.Schema( {
    name : {
        type: String, 
        required: true,
        trim: true,
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    songs : [ {
        type: mongoose.Types.ObjectId,
        ref: "Song"
    }
    ],
    isPublic: {
        type: Boolean,
        default: true
    }
}, {
    timestamps : true
})

const playlist = mongoose.model( Playlist, "playlist" );

export {playlist};