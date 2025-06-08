import mongoose from "mongoose";

const User = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profilePic: {
        type: String,
        required: false,
    },
    likedSongs : [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    playlist: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }]
}, {
    timestamps: true
});

const user = mongoose.model( User, "user" );

export {user};