import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const  protectAdmin = async ( req, res, next ) => {
    try{
        console.log( "checking admin" );
        
        const user = req.user;

        if( user.role != "admin" )
            return res.status( 500 ).json( {
                success: false,
                status: 500,
                message: "No Admin permission"
            })
        req.admin = true;
        console.log( "Admin correct" );
        next();
        
    }
    catch( err ) {
        console.error( err );
        return res.status( 500 ).json( {
            success: false,
            status: 500,
            message: "Something went wrong while authenticating admin :"
        })
    }
}

export { protectAdmin }