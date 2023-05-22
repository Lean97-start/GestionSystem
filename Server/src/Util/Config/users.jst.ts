import jwt from 'jsonwebtoken';
import { enviroments } from './configENV';

let { jwt_secret } = enviroments();
const generateJwt = (id: string, username: string, fullNameUser: string) => {
    const token = jwt.sign(
        {
            id,
            username,
            fullNameUser,
            
        },
        jwt_secret,
        {
        expiresIn: 60 * 60 * 8, //El token tiene un tiempo de expiracion una hora
        }
    );
    return { token };
};

export default generateJwt;
