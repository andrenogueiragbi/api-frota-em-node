import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();




export function generateToken(params = {}) {
    let duratiomToken = 86400;  // 1 dia
    return jwt.sign(params, process.env.KEY_SECRET || 'abc123', {
        expiresIn: parseInt(process.env.DURATION_TOKEN),
    });
}

export function checkToken (token) {

    return jwt.verify(token, process.env.KEY_SECRET, (err, decoded) => {
        if (err) return {
            expires: true,
            payload: null
        }
        return {
            expires: false,
            payload: decoded
        }
    });
}



