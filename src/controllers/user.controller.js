import { User } from "../models/user.model.js"
import {hashPassword, verifyPassword} from "../utils/password.js";
import { generateAccessToken } from "../utils/generateToken.js";

const createUser = async( req, res ) => {
    console.log( "User Signing Up");
    const { name, email, password } = req.body;

    if( !name || !email || !password ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "Please enter all fields"
        })
    }

    const findUser = await User.findOne( {email: email } );

    if( findUser ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "Duplicate user present"
        })
    }

    const hash = await hashPassword( password );

    const user = await User.create( {
        name, 
        email,
        password: hash
    })

    if( !user ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "ERROR in creating user"
        })
    }

    console.log( "User Signed In successfully" );

    return res.status( 201 ).json( {
        success: true,
        status: 201,
        message: "Sign in successful"
    })
}

const loginUser = async( req, res ) => {

    console.log( "Logging in " );

    const { email, password } = req.body;

    if( !email || !password ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "Enter all details"
        })
    }

    const user = await User.findOne( {email : email } );

    if( !user ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            message: "Invalid user"
        })
    }

    if( ! await verifyPassword( password, user.password ) )
    {
        return res.status( 202 ).json( {
            success: false,
            status: 202,
            message: "Wrong password"
        })
    }

    const userObject = user.toObject();
    delete userObject.password;

    const accessToken = await generateAccessToken( userObject );

    if( !accessToken ) {
        return res.status( 400 ).json( {
            success: false,
            status: 400,
            messsage: "Error generating access token"
        })
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.status==='production',
        sameSite: 'lax'
    }

    console.log( "Log in successful" );

    return res.status( 200 )
    .cookie( "ACCESS_TOKEN", accessToken, cookieOptions )
    .json( {
        success: true,
        status: 200,
        message: "Login successful"
    })

}

const getUser = async( req, res ) => {

    console.log( "Fetching current USER" );

    return res.status( 200 ).json( {
        success:true,
        status: 200,
        body: req.user,
        message: "User fetched successfully"
    })
}

const logOut = async( req, res ) => {
    console.log( "USER logging out" );
    res.clearCookie( "ACCESS_TOKEN", {
        httpOnly: true,
        secure: process.env.STATUS==='production',
        sameSite: 'lax'
    })

    return res.status( 200 ).json( {
        success: true,
        status: 200,
        message: "User logged out successfully"
    })
}