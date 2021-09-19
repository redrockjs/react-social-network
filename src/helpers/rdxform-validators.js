export const requiredField = value => {
    if (value) return undefined;
    return "Обязательное поле";
}

export const maxLenghtCtr = (maxLenght) => (value) => {
    if (value && value.length > maxLenght) return `Максимальная длина ${maxLenght} символов`;
    return undefined;
}

export const minLenghtCtr = (minLenght) => (value) => {
    if (value && value.length < minLenght) return `Минимальная длина ${minLenght} символов`;
    return undefined;
}

