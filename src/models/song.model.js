import mongoose from "mongoose";

const Song = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String, 
        required: false,
        trim: true
    },
    duration: { //in seconds
        type: Number,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true
    },
    coverUrl: {
        type: String
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const song = mongoose.model( Song, "song" );

export {song}