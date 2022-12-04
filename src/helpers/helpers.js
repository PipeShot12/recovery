function reverseDate(str) {
    return str.split('/').reverse().join('/');
}
function decimales(numero){
    const strToNumber = Number(numero)
    return strToNumber.toLocaleString()
    // const toString = numeroConPuntos.toString()
    // return toString.replace(/\,/g,'.');
}
export { reverseDate,decimales  }