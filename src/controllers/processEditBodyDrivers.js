import validar from '../lib/checkParameter.js';
import { print } from '../lib/print.js'
import { v4 as id } from "uuid"

function capitalizeName(name) {
    const words = name.split(' '); // Divide o nome em palavras
    const capitalizedWords = words.map(word => !['de', 'da', 'DE', 'DA'].includes(word) ? word.charAt(0).toUpperCase() + word.slice(1) : word); // Capitaliza a primeira letra de cada palavra
    return capitalizedWords.join(' '); // Junta as palavras de volta em uma string
}

function isBooleanString(str) {
    return str.toLowerCase() === 'true' || str.toLowerCase() === 'false';
}


export default function processBodyDrivers(req_body, req_method, req_originalUrl) {

    let editDriver = {}

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
        integration_code,
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


    editDriver.active = active === 'false' ? false : true


    if (name && !validar.lengthString(name.trim(), 10)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`NOME PEQUENO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the name is too small',
            message_pt: 'o nome é muito pequeno',

        };

    }

    editDriver.name = name ? capitalizeName(name.trim()) : undefined;

    if (cpf && !validar.validateCPF(cpf)) { //VALIDA O NOME (NECESSARIO TER MAIS DE 10 CARATERS)

        print(`CPF INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the cpf is invalid or does not exist',
            message_pt: 'o cpf é inválido ou não existe',

        };

    }

    editDriver.cpf = cpf ? `${cpf.replace(/\D/g, '').slice(0, 3)}.${cpf.replace(/\D/g, '').slice(3, 6)}.${cpf.replace(/\D/g, '').slice(6, 9)}.${cpf.replace(/\D/g, '').slice(9)}` : undefined


    if (rg && !validar.lengthString(rg.trim(), 5)) { //VALIDA O RG (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the rg is invalid or does not exist',
            message_pt: 'o rg é inválido ou não existe',

        };

    }

    editDriver.rg = rg ? rg.trim() : undefined;

    if (workload && !validar.lengthString(workload.trim(), 2)) { //VALIDA O CARGO (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'the workload is invalid or does not exist',
            message_pt: 'o cargo é inválido ou não existe',

        };

    }

    editDriver.workload = workload ? workload.trim() : undefined

    if (supervisor && !validar.lengthString(supervisor.trim(), 4)) { //VALIDA O SUPERVISOR (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'name supervisor is invalid or does not exist',
            message_pt: 'o nome do supervisor é inválido ou não existe',

        };

    }

    editDriver.supervisor = supervisor ? capitalizeName(supervisor.trim()) : undefined

    if (cnh_number && !validar.isNumber(cnh_number.trim())) { //VALIDA O NUMERO DA CNH (NECESSARIO TER MAIS DE 10 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'number CNH is invalid or does not exist',
            message_pt: 'o número da  CNH é inválido ou não existe',

        };

    }

    editDriver.cnh_number = cnh_number ? parseInt(cnh_number.trim()) : undefined

    if (cnh_category && !validar.lengthString(cnh_category.trim(), 1)) { //VALIDA O CATEGORIA DA CNH (NECESSARIO TER MAIS DE 1 CARACTERS)

        print(`CPF INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'category is invalid or does not exist',
            message_pt: 'a categoria da CNH é inválido ou não existe',

        };

    }

    editDriver.cnh_category = cnh_category ? cnh_category.trim() : undefined


    if (cnh_expiration && !validar.isDate(cnh_expiration)) { //VALIDA O DATA DA CNH (NECESSARIO SER UMA DATA)

        print(`CPF INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'date expiration is invalid or does not exist',
            message_pt: 'a data da CNH é inválido ou não existe',
            cnh_expiration

        };

    }

    editDriver.cnh_expiration = cnh_expiration

    if (neighborhood && !validar.lengthString(neighborhood.trim(), 5)) { //VALIDA O BAIRRO (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`BAIRRO INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'neighborhood is invalid or does not exist',
            message_pt: 'o bairro é inválido ou não existe',

        };

    }

    editDriver.neighborhood = neighborhood ? neighborhood.trim() : undefined

    if (address && !validar.lengthString(address.trim(), 5)) { //VALIDA O ENDEREÇO (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`BAIRRO INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'address is invalid or does not exist',
            message_pt: 'o endereço é inválido ou não existe',

        };

    }

    editDriver.address = address ? address.trim() : undefined


    if (city && !validar.lengthString(city.trim(), 5)) { //VALIDA O CIDADE (NECESSARIO TER MAIS DE 5 CARACTERS)

        print(`CIDADE INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'city is invalid or does not exist',
            message_pt: 'a cidade é inválido ou não existe',

        };

    }

    editDriver.city = city ? city.trim() : undefined

    if (state && !validar.lengthString(state.trim(), 2)) { //VALIDA O ESTADO (NECESSARIO TER MAIS DE 2 CARACTERS)

        print(`ESTADO INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'state is invalid or does not exist',
            message_pt: 'a estado é inválido ou não existe',

        };

    }

    editDriver.state = state ? state.trim() : undefined

    if (cell_phone && !validar.lengthString(cell_phone.trim(), 11)) { //VALIDA O CELULAR (NECESSARIO TER MAIS DE 2 CARACTERS)

        print(`CELULAR INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'cell phone is invalid or does not exist',
            message_pt: 'o telefone celular é inválido ou não existe',

        };

    }

    editDriver.cell_phone = cell_phone ? `(${cell_phone.replace(/\D/g, '').slice(0, 2)}) ${cell_phone.replace(/\D/g, '').slice(2, 7)}-${cell_phone.replace(/\D/g, '').slice(7)}` : undefined

    if (whatsapp && !validar.lengthString(whatsapp.trim(), 11)) { //VALIDA O WHATSAPP (NECESSARIO TER MAIS DE 2 CARACTERS)

        print(`WHATSAPP INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'whatsapp is invalid or does not exist',
            message_pt: 'whatsapp é inválido ou não existe',

        };

    }

    editDriver.whatsapp = whatsapp ? `(${whatsapp.replace(/\D/g, '').slice(0, 2)}) ${whatsapp.replace(/\D/g, '').slice(2, 7)}-${whatsapp.replace(/\D/g, '').slice(7)}` : undefined

    if (email && !validar.email(email)) { //VALIDA O EAMIL

        print(`EMAIL INVÁLIDO - 403 - ${req_method} ${req_originalUrl}`, 'ALERT');
        return {
            ok: false,
            message_en: 'email is invalid or does not exist',
            message_pt: 'o email é inválido ou não existe',

        };

    }

    editDriver.email = email
    editDriver.integration_code = integration_code ? integration_code.trim() : undefined
    editDriver.number_address = number_address ? number_address.trim() : undefined
    editDriver.ok = true

    return editDriver

}