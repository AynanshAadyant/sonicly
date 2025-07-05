import mongoose from "mongoose";

const SongSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist:[ {
        type: String,
        required: true,
        trim: true
    }],
    genre: [{
        type: String, 
        trim: true
    }],
    duration: { //in seconds
        type: Number,
        required: true,
    },
    songUrl: {
        type: String,
        required: true
    },
    coverUrl: {
        type: String
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    timesPlayed : {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Song = mongoose.model( "Song", SongSchema );

export {Song}