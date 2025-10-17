import { compare, genSalt, hash } from "bcrypt";

const PASSWORD_SALT = 8;

export const hashPassword = async (password:string):Promise<string> => {

    const saltedAux = await genSalt(PASSWORD_SALT);
    const hashedPassword = await hash(password,saltedAux)
    return hashedPassword;

}

export const verifyPassword = async (receivedPassword:string, DBPassword:string): Promise<boolean> => {

    const isMatch  = await compare(receivedPassword, DBPassword);
    return isMatch;

}

export const PasswordCrypto = {
    hashPassword,
    verifyPassword

}


/*


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

*/