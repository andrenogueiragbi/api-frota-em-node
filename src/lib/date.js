
const DayWelk = (number) => {
    switch (number) {
        case 1:
            return 'segunda'
        case 2:
            return 'terça'
        case 3:
            return 'quarta'
        case 4:
            return 'quinta'
        case 5:
            return 'sexta'
        case 6:
            return 'sabado'
        case 0:
            return 'domingo'
    }
}

export function printMoment (){
    var data = new Date()
    
    const dia = data.getDate().toString()
    const diaF = (dia.length == 1) ? '0' + dia : dia
    const mes = (data.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
    const mesF = (mes.length == 1) ? '0' + mes : mes
    const anoF = data.getFullYear();
    const  hora = String(data.getHours())
    const horaF = (hora.length == 1) ? '0' + hora  : hora
    const minutos = String(data.getMinutes())
    const minutosF = (minutos.length == 1) ? '0' + minutos  : minutos
    const segundos = String(data.getSeconds())
    const segundosf = (segundos.length == 1) ? '0'+segundos : segundos
    const weekF = DayWelk(data.getDay())

    return {
        dateHour: `${diaF}/${mesF}/${anoF}-${horaF}:${minutosF}:${segundosf}`,
        dateAll: `${diaF}/${mesF}/${anoF}`,
        hourAll: `${horaF}:${minutosF}:${segundosf}`,
        hour: `${horaF}`,
        minutes: minutosF,
        seconds: segundosf,
        day: diaF,
        month: mesF,
        year: anoF,
        week: weekF
    }

}