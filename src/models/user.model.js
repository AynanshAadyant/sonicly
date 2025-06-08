import mongoose from "mongoose";

const UserSchema = new mongoose.Schema( {
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

const User = mongoose.model( "User", UserSchema );

export {User};