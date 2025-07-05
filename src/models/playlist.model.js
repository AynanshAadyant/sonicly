import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema( {
    name : {
        type: String, 
        required: true,
        trim: true,
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false
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

const Playlist = mongoose.model( "Playlist", PlaylistSchema );

export {Playlist};