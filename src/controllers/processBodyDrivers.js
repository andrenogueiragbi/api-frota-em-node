import validar from '../lib/checkParameter.js';
import { print } from '../lib/print.js'
import { v4 as id } from "uuid"

function capitalizeName(name) {
    const words = name.split(' '); // Divide o nome em palavras
    const capitalizedWords = words.map(word => !['de', 'da', 'DE', 'DA'].includes(word) ? word.charAt(0).toUpperCase() + word.slice(1) : word); // Capitaliza a primeira letra de cada palavra
    return capitalizedWords.join(' '); // Junta as palavras de volta em uma string
}



export default function processBodyDrivers(req, res) {


    let {
        name,
        cpf,
        rg,
        workload,
        supervisor,
        cnh_number,
        cnh_category,
        cnh_expiration,
        address,
        neighborhood,
        number_address,
        city,
        state,
        email,
        cell_phone,
        whatsapp,
        integration_code } = req.body;


    if (!name || !validar.lengthString(name.trim(), 10)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`NOME PEQUENO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'the name is too small',
            message_pt: 'o nome é muito pequeno',

        });

    }

    if (!cpf || !validar.validateCPF(cpf)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`CPF INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'the cpf is invalid or does not exist',
            message_pt: 'o cpf é inválido ou não existe',

        });

    }

    if (!rg || !validar.lengthString(rg.trim(), 5)) { //VALIDA O RG (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'the rg is invalid or does not exist',
            message_pt: 'o rg é inválido ou não existe',

        });

    }
    if (!workload || !validar.lengthString(workload.trim(), 2)) { //VALIDA O CARGO (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'the workload is invalid or does not exist',
            message_pt: 'o cargo é inválido ou não existe',

        });

    }

    if (!supervisor || !validar.lengthString(supervisor.trim(), 4)) { //VALIDA O SUPERVISOR (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'name supervisor is invalid or does not exist',
            message_pt: 'o nome do supervisor é inválido ou não existe',

        });

    }

    if (!cnh_number || !validar.isNumber(cnh_number.trim())) { //VALIDA O NUMERO DA CNH (NECESSARIO TER MAIS DE 10 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'number CNH is invalid or does not exist',
            message_pt: 'o número da  CNH é inválido ou não existe',

        });

    }

    if (!cnh_category || !validar.lengthString(cnh_category.trim(), 1)) { //VALIDA O CATEGORIA DA CNH (NECESSARIO TER MAIS DE 1 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'category is invalid or does not exist',
            message_pt: 'a categoria da CNH é inválido ou não existe',

        });

    }


    if (!cnh_expiration || !validar.isDate(cnh_expiration)) { //VALIDA O DATA DA CNH (NECESSARIO SER UMA DATA)

        print(`CPF INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'date expiration is invalid or does not exist',
            message_pt: 'a data da CNH é inválido ou não existe',
            cnh_expiration

        });

    }

    if (!neighborhood || !validar.lengthString(neighborhood.trim(), 5)) { //VALIDA O BAIRRO (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`BAIRRO INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'neighborhood is invalid or does not exist',
            message_pt: 'o bairro é inválido ou não existe',

        });

    }

    if (!address || !validar.lengthString(address.trim(), 5)) { //VALIDA O ENDEREÇO (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`BAIRRO INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'address is invalid or does not exist',
            message_pt: 'o endereço é inválido ou não existe',

        });

    }


    if (!city || !validar.lengthString(city.trim(), 5)) { //VALIDA O CIDADE (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CIDADE INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'city is invalid or does not exist',
            message_pt: 'a cidade é inválido ou não existe',

        });

    }

    if (!state || !validar.lengthString(state.trim(), 2)) { //VALIDA O ESTADO (NECESSARIO TER MAIS DE 2 CARACTERS)

        print(`ESTADO INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'state is invalid or does not exist',
            message_pt: 'a estado é inválido ou não existe',

        });

    }

    if (!cell_phone || !validar.lengthString(cell_phone.trim(), 11)) { //VALIDA O CELULAR (NECESSARIO TER MAIS DE 2 CARACTERS)

        print(`CELULAR INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'cell phone is invalid or does not exist',
            message_pt: 'o telefone celular é inválido ou não existe',

        });

    }

    if (!whatsapp || !validar.lengthString(whatsapp.trim(), 11)) { //VALIDA O WHATSAPP (NECESSARIO TER MAIS DE 2 CARACTERS)

        print(`WHATSAPP INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'whatsapp is invalid or does not exist',
            message_pt: 'whatsapp é inválido ou não existe',

        });

    }

    if (!email || !validar.email(email)) { //VALIDA O EAMIL

        print(`EMAIL INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
        return res.status(403).send({
            ok: false,
            message_en: 'email is invalid or does not exist',
            message_pt: 'o email é inválido ou não existe',

        });

    }


    name = capitalizeName(name.trim())
    cpf =  cpf = cpf.replace(/\D/g, '');
    cpf = cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9)
    rg = rg.trim()
    workload = workload.trim()
    supervisor = capitalizeName(supervisor.trim())
    cnh_number = parseInt(cnh_number.trim())
    cnh_category = cnh_category.trim()
    address = address.trim()
    neighborhood = neighborhood.trim()
    number_address = number_address ? number_address.trim() : null
    city = city.trim()
    state = state.trim()
    cell_phone = cell_phone.replace(/\D/g, '')
    cell_phone = '(' + cell_phone.slice(0, 2) + ') ' + cell_phone.slice(2, 7) + '-' + cell_phone.slice(7)
    whatsapp = whatsapp.replace(/\D/g, '')
    whatsapp = '(' + whatsapp.slice(0, 2) + ') ' + whatsapp.slice(2, 7) + '-' + whatsapp.slice(7)
    integration_code = integration_code ? integration_code.trim() : null


    return {
        id: id(),
        name,
        cpf,
        rg,
        workload,
        supervisor,
        cnh_number,
        cnh_category,
        cnh_expiration,
        address,
        neighborhood,
        number_address,
        city,
        state,
        email,
        cell_phone,
        whatsapp,
        integration_code

    };


}