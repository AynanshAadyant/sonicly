import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config( {} );

const generateAccessToken = async( data ) => {
    const token = jwt.sign( data, process.env.ACCESS_TOKEN_SECRET, { expiresIn : process.env.ACCESS_TOKEN_EXPIRY  } );
    return token;
}

export {generateAccessToken};