import validar from '../lib/checkParameter.js';
import { print } from '../lib/print.js'

function isBooleanString(str) {
    return str.toLowerCase() === 'true' || str.toLowerCase() === 'false';
}


export default function processBodyDrivers(req_body, req_method, req_originalUrl) {

    let editFleet = {}

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
        km,
        active
    } = req_body;

    if (active && !isBooleanString(active)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`ACTIVE NÃO É BOLEANO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the active is not boolean',
            message_pt: 'o active não e boleano',

        };

    }


    editFleet.active = active === 'false' ? false : true


    if (model && !validar.lengthString(model.trim(), 4)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`MODELO PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the model is too small',
            message_pt: 'o modelo é muito pequeno',

        };

    }

    editFleet.model = model ? model.trim() : undefined;


    if (code && !validar.lengthString(code.trim(), 3)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`CÓDIGO PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the code is invalid or does not exist',
            message_pt: 'o código é inválido ou não existe',

        };

    }

    editFleet.code = code ? code.trim() : undefined;


    if (plate && !validar.lengthString(plate.trim(), 7)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`PLACA PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the plate is invalid or does not exist',
            message_pt: 'o placa é inválido ou não existe',

        };

    }

    editFleet.plate = plate ? plate.trim() : undefined;




    if (year && !validar.lengthString(year.trim(), 4)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`ANO PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the year is invalid or does not exist',
            message_pt: 'o ano é inválido ou não existe',

        };

    }

    editFleet.year = year ? year.trim() : undefined;


    if (fuel && !validar.lengthString(fuel.trim(), 3)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`COMBUSTÍVEL PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the fuel is invalid or does not exist',
            message_pt: 'o combustível é inválido ou não existe',

        };

    }

    editFleet.fuel = fuel ? fuel.trim() : undefined;



    if (brand && !validar.lengthString(brand.trim(), 4)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`MARCA PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the brand is invalid or does not exist',
            message_pt: 'o marca é inválido ou não existe',

        };

    }

    editFleet.brand = brand ? brand.trim() : undefined;

    if (type && !validar.lengthString(type.trim(), 3)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`TIPO PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the type is invalid or does not exist',
            message_pt: 'o tipo é inválido ou não existe',

        };

    }


    editFleet.type = type ? type.trim() : undefined;



    if (km && !validar.isNumber(km)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`KM PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the km is invalid or does not exist',
            message_pt: 'o km é inválido ou não existe',

        };

    }

    editFleet.km = km ? Number(km.trim()) : undefined




    editFleet.chassi = chassi ? chassi.trim() : undefined
    editFleet.engine_number = engine_number ? engine_number.trim() : undefined
    editFleet.ok = true


    return editFleet


}