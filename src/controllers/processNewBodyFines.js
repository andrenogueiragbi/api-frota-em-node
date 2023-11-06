import validar from '../lib/checkParameter.js';
import { print } from '../lib/print.js'
import { v4 as id } from "uuid"



export default function processBodyFines(req_body, req_method, req_originalUrl) {


    let {
        id_driver,
        date,
        hour,
        description_type,
        location,
        state,
        city,
        justify_driver,
        id_fleet,
        value,
        payment,
        company_payment,
        driver_payment,
        points


    } = req_body;


    if (!id_driver) { //VALIDA O ID MOORISTA (NECESSARIO SER NÚMERO)

        print(`ID MOTORISTA INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the id_driver is invalid or does not exist',
            message_pt: 'o id do motorista é inválido ou não existe',

        };

    }

    if (!date || !validar.isDate(date)) { //VALIDA O DATA (NECESSARIO SER UMA DATA VALIDA)

        print(`DATA INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the date is invalid or does not exist',
            message_pt: 'a data é inválido ou não existe',

        };

    }

    if (!hour) { //VALIDA A HORA (NECESSARIO SER UMA HORÁRIO VALIDA)

        print(`HORA INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the hour is invalid or does not exist',
            message_pt: 'o horário é inválido ou não existe',

        };

    }

    if (!description_type || !validar.lengthString(description_type.trim(), 5)) { //VALIDA O NOME DA MULTA (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`DESCRIÇÃO INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the description_type is too small',
            message_pt: 'a descrição da multa é muito pequeno',

        };

    }

    if (!location || !validar.lengthString(location.trim(), 5)) { //VALIDA A LOCALIZAÇÃO DA MULTA (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`LOCALIZAÇÃO INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the location is too small',
            message_pt: 'a localização da multa é muito pequeno',

        };

    }

    if (!state || !validar.lengthString(state.trim(), 2)) { //VALIDA O ESTADO (NECESSARIO TER MAIS DE 2 CARACTERS)

        print(`ESTADO INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'state is invalid or does not exist',
            message_pt: 'a estado é inválido ou não existe',

        };

    }

    if (!city || !validar.lengthString(city.trim(), 5)) { //VALIDA O CIDADE (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CIDADE INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'city is invalid or does not exist',
            message_pt: 'a cidade é inválido ou não existe',

        };

    }


    if (!justify_driver || !validar.lengthString(justify_driver.trim(), 5)) { //VALIDA A JUSTIFICATIVA DA MULTA (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`JUSTIFICATIVA INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the justify_driver is too small',
            message_pt: 'a justificativa da multa é muito pequeno',

        };

    }



    if (!id_fleet) { //VALIDA O ID MOORISTA (NECESSARIO SER NÚMERO)

        print(`ID FROTA INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the id_fleet is invalid or does not exist',
            message_pt: 'o id do frota é inválido ou não existe',

        };

    }



    if (!value || !validar.isFloat(value)) { //VALIDA O VALOR DA MULTA (NECESSARIO SER UMA VALOR VÁLIDO)

        print(`VALOR INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the value is invalid or does not exist',
            message_pt: 'o valor é inválido ou não existe',

        };

    }


    if (!payment || !validar.lengthString(payment.trim(), 5)) { //VALIDA FORMA DE PAGAMENTO DA MULTA (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`PAGAMENTO INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the payment is too small',
            message_pt: 'a pagamento da multa é muito pequeno',

        };

    }

    if (!company_payment || !validar.isFloat(company_payment)) { //VALIDA O VALOR PAGO PELA EMPRESA (NECESSARIO SER UMA VALOR VÁLIDO)

        print(`PAGAMENTO DA EMPRESA INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the company_payment is invalid or does not exist',
            message_pt: 'o valor da empresa é inválido ou não existe',

        };

    }

    if (!driver_payment || !validar.isFloat(driver_payment)) { //VALIDA O VALOR PAGO PELO MOTORISTA (NECESSARIO SER UMA VALOR VÁLIDO)

        print(`PAGAMENTO DO MOTORISTA INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the driver_payment is invalid or does not exist',
            message_pt: 'o valor do motorista é inválido ou não existe',

        };

    }

    if ((parseFloat(company_payment) + parseFloat(driver_payment)) !== parseFloat(value)) { //VALIDA O VALOR PAGO ENTRE MOTORISTA E EMPRESA (NECESSARIO SER UMA VALOR VÁLIDO)

        print(`SOMAS DA MULTA INVÁLIDOS - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the sum is invalid or does not exist',
            message_pt: 'a divisão da multa entre mototista e empresa não é igual ao valor: ' + value,

        };
    }


    if (!points || !validar.isNumber(points)) { //VALIDA OS PONTOS (NECESSARIO SER NÚMERO)

        print(`ID PONTOS DA MULTA INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the points is invalid or does not exist',
            message_pt: 'o pontos do motorista é inválido ou não existe',

        };

    }


    description_type = description_type.trim()
    location = location.trim()
    state = state.trim()
    city = city.trim()
    justify_driver = justify_driver.trim()
    value = parseFloat(value.trim())
    company_payment = parseFloat(company_payment.trim())
    driver_payment = parseFloat(driver_payment.trim())
    payment = payment.trim()



    return {
        ok: true,
        id: id(),
        id_driver,
        date,
        hour,
        description_type,
        location,
        state,
        city,
        justify_driver,
        id_fleet,
        value,
        payment,
        company_payment,
        driver_payment,
        points,
        like_data: `${date} ${hour} ${description_type} ${location} ${state} ${city} ${justify_driver} ${points}`
    };


}