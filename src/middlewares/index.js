import { checkToken } from '../lib/token.js'
import Login from '../models/loginModel.js';



export default async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            ok: false,
            message: 'No token provider'
        });
    }

    const parts = authHeader.split(' ');


    if (!parts.length == 2) {
        return res.status(401).send({
            ok: false,
            message: 'Token error!'
        });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({
            erro: true,
            message: 'Token malFormatted'
        });
    }
    const {expires,payload: { result:{id,email,type} }} = checkToken(token)


    if (expires || !await Login.findOne({where:{email,active:'Y'}})) {

        return res.status(401).send({
            ok: false,
            message: 'Token invalid'
        });


    } else {
        console.log(type)
        req.type_user = type
        next()
    }

}