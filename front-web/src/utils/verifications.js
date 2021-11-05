
export function isNumber(str) {
    return !isNaN(str)
}

export function isNumberList(list) {
    let numberList = true;
    list.forEach(elem => {
        if (isNumber(elem) === false) {
            numberList = false;
        }
    });
    return numberList;
}

export function convertStringForNumber(number) {
    let num = Number(number);
    return num;
}

export function sortNumbers(a, b){
    return a - b;
}