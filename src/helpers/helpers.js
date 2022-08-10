function reverseDate(str) {
    return str.split('/').reverse().join('/');
}
function decimales(numero){
    const strToNumber = Number(numero)
    const numeroConPuntos = strToNumber.toLocaleString()

    return numeroConPuntos
}
export { reverseDate,decimales  }