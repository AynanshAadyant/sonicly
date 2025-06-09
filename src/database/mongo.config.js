import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

export const connectDB = async () => {

    try{ 
        
        const connection = await mongoose.connect( `${process.env.MONGO_URL}/sonicly` );
        console.log( "Mongo DB connected" );
    }
    catch( e ) {
        console.log("Mongo DB connection failed" );
    }
}