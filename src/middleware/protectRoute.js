import User, { user } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config( {} );

const protectRoute = async( req, res, next ) => {
    const token = req.cookie.ACCESS_TOKEN;

    if( !token ) {
        return res.status( 200 ).json( {
            success: false,
            status: 200,
            message: "USER not logged in OR ACCESS TOKEN missing"
        })
    }
    try{ 
        const decode = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET );
        const verifyUser = await User.findById( decode._id );
        if( !verifyUser ) {
            return res.status( 401 ).json( {
                success : false,
                status: 401,
                message: "Invalid token"
            })
        }

        req.user = user;
        
        next();
    }
    catch( e ) {
        console.log( "ERROR : ", e );
        return res.status( 401 ).json( {
            success: false,
            status : 401,
            message : "Something went wrong while accessing or decoding ACCESS_TOKEN"
        })
    }
}

export {protectRoute }