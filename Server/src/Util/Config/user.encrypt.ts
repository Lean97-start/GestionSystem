import * as bcrypt from 'bcryptjs';

const hashPass = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

const matchPass = (hash: any, password: string) => {
    console.log("HASH", hash)
    //Comparamos la contrasena con el hash en la db
    const match = bcrypt.compareSync(password, hash);
    return match;
};

export { hashPass, matchPass };