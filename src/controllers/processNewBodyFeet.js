import validar from '../lib/checkParameter.js';
import { print } from '../lib/print.js'
import {v4 as id} from 'uuid'


export default function processBodyDrivers(req_body, req_method, req_originalUrl) {


    let {
        model,
        code,
        plate,
        chassi,  //optional
        engine_number, //optional
        year,
        fuel,
        brand,
        type,
        km
    } = req_body;


    if (!model || !validar.lengthString(model.trim(), 4)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`MODELO PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the model is too small',
            message_pt: 'o modelo é muito pequeno',

        };

    }

    if (!code || !validar.lengthString(code.trim(), 3)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`CÓDIGO PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the code is invalid or does not exist',
            message_pt: 'o código é inválido ou não existe',

        };

    }


    if (!plate || !validar.lengthString(plate.trim(), 7)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`PLACA PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the plate is invalid or does not exist',
            message_pt: 'o placa é inválido ou não existe',

        };

    }


    if (!year || !validar.lengthString(year.trim(), 4)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`ANO PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the year is invalid or does not exist',
            message_pt: 'o ano é inválido ou não existe',

        };

    }


    if (!fuel || !validar.lengthString(fuel.trim(), 3)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`COMBUSTÍVEL PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the fuel is invalid or does not exist',
            message_pt: 'o combustível é inválido ou não existe',

        };

    }


    if (!brand || !validar.lengthString(brand.trim(), 4)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`MARCA PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the brand is invalid or does not exist',
            message_pt: 'o marca é inválido ou não existe',

        };

    }

    if (!type || !validar.lengthString(type.trim(), 3)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`TIPO PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the type is invalid or does not exist',
            message_pt: 'o tipo é inválido ou não existe',

        };

    }


    if (!km || !validar.isNumber(km)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`KM PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the km is invalid or does not exist',
            message_pt: 'o km é inválido ou não existe',

        };

    }

    model = model.trim()
    code = code.trim()
    plate = plate.trim().toUpperCase()
    chassi = chassi ? chassi.trim() : undefined
    engine_number = engine_number ? engine_number.trim() : undefined
    year = year.trim()
    fuel = fuel.trim()
    brand = brand.trim()
    type = type.trim()



    return {
        ok: true,
        id: id(),
        model,
        code,
        plate,
        chassi,  //optional
        engine_number, //optional
        year,
        fuel,
        brand,
        type,
        km,
        like_data: `${model} ${code} ${plate} ${chassi} ${engine_number} ${year} ${fuel} ${brand} ${type} ${km}`

    };


}