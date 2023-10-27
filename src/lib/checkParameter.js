import validator from 'validator'


export default {
    email(email) {
        if (validator.isEmail(email)) return true
        return false

    },
    password(password) {
        if (validator.isLength(password, { min: 8 }) && (!validator.isUppercase(password) && !validator.isLowercase(password)) && /[^a-zA-Z0-9]/.test(password)) return true
        return false;

    },

    validateCPF(cpf) {
        // Remova caracteres não numéricos do CPF
        cpf = cpf.replace(/\D/g, '');

        // Verifique se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verifique se todos os dígitos são iguais; isso não é válido
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        // Calcule o primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let firstDigit = 11 - (sum % 11);
        if (firstDigit === 10 || firstDigit === 11) {
            firstDigit = 0;
        }

        // Verifique o primeiro dígito verificador
        if (parseInt(cpf.charAt(9)) !== firstDigit) {
            return false;
        }

        // Calcule o segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let secondDigit = 11 - (sum % 11);
        if (secondDigit === 10 || secondDigit === 11) {
            secondDigit = 0;
        }

        // Verifique o segundo dígito verificador
        if (parseInt(cpf.charAt(10)) !== secondDigit) {
            return false;
        }

        return true; // CPF é válido
    },

    lengthString(string, min) {
        if (validator.isLength(string, { min })) return true
        return false;

    },
    isNumber(number) {
        if (validator.isNumeric(number)) return true
        return false

    },
    isDate(date) {
        if (validator.toDate(date)) return true
        return false

    },






}