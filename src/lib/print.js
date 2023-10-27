import { printMoment } from './date.js';


export function print(print, type) {
    const { dateHour } = printMoment()


    if (type.toUpperCase() == "INFO") {
        console.log('\x1b[32m%s\x1b[0m \x1b[48;5;4m%s\x1b[0m \x1b[48;5;0m%s\x1b[0m', dateHour, `${type.toUpperCase()}`, print.toUpperCase());
    } else if (type.toUpperCase() == "ERROR") {
        console.log('\x1b[32m%s\x1b[0m \x1b[48;5;1m%s\x1b[0m  \x1b[48;5;1m%s\x1b[0m', dateHour, `${type.toUpperCase()}`, print.toUpperCase());
    } else if (type.toUpperCase() == "ALERT") {
        console.log('\x1b[32m%s\x1b[0m \x1b[48;5;3m%s\x1b[0m \x1b[48;5;3m%s\x1b[0m', dateHour, `${type.toUpperCase()}`, print.toUpperCase());
    } else if (type.toUpperCase() == "DEBUG") {
        console.log('\x1b[32m%s\x1b[0m \x1b[48;5;7m%s\x1b[0m \x1b[48;5;7m%s\x1b[0m', dateHour, `${type.toUpperCase()}`, print.toUpperCase());
    } else {
        console.log('\x1b[32m%s\x1b[0m \x1b[48;5;2m%s\x1b[0m \x1b[48;5;2m%s\x1b[0m', dateHour, `${"OKAY".toUpperCase()}`, print.toUpperCase());
    }
}

/* \x1b[31m: Vermelho
    \x1b[32m: Verde
    \x1b[33m: Amarelo
    \x1b[34m: Azul
    \x1b[35m: Magenta (roxo)
    \x1b[36m: Ciano (azul claro)
    \x1b[37m: Branco
    \x1b[90m: Cinza claro
    \x1b[91m: Vermelho claro
    \x1b[92m: Verde claro
    \x1b[93m: Amarelo claro
    \x1b[94m: Azul claro
    \x1b[95m: Magenta claro
    \x1b[96m: Ciano claro */


/*     Fundo preto: \x1b[48;5;0m
        Fundo vermelho: \x1b[48;5;1m
        Fundo verde: \x1b[48;5;2m
        Fundo amarelo: \x1b[48;5;3m
        Fundo azul: \x1b[48;5;4m
        Fundo magenta: \x1b[48;5;5m
        Fundo ciano: \x1b[48;5;6m
        Fundo branco: \x1b[48;5;7m */