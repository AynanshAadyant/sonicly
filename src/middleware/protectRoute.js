import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config( {} );

const protectRoute = async( req, res, next ) => {
    
    try{ 
        console.log( "checking user" );
        const token = req.cookies.ACCESS_TOKEN;
        if( !token ) {
            return res.status( 500 ).json( {
                success: false,
                status: 500,
                message: "USER not logged in OR ACCESS TOKEN missing"
            })
        }
        const decode = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET );
        const verifyUser = await User.findById( decode._id ).select( "-password" );
        if( !verifyUser ) {
            return res.status( 401 ).json( {
                success : false,
                status: 401,
                message: "Invalid token"
            })
        }
        console.log( "user correct" );
        req.user = verifyUser;
        
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