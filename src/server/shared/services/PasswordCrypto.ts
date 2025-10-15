import { compare, genSalt, hash } from "bcrypt";


const PASSWORD_SALT = 8;


export const hashPassword = async (password:string) => {

    const saltGenerated = await genSalt(PASSWORD_SALT);
    const hashPassword = await hash(password, saltGenerated);
    return hashPassword;
}


export const verifyPassword = async (sentPassword: string, hashedPassword: string) => {

    const result = await compare(sentPassword, hashedPassword);
    return result;
}

export const PasswordCrypto = {
    hashPassword,
    verifyPassword
}
