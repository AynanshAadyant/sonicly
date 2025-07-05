import bcrypt from "bcrypt";

const hashPassword = async ( password ) => {
    const hash = await bcrypt.hash( password, parseInt(process.env.SALT_ROUNDS) || 10 );
    return hash;
}

const verifyPassword = async( password, hash ) => {
    return await bcrypt.compare( password, hash );
}

export {hashPassword, verifyPassword };