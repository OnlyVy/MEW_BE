const isNumericString = (str) => {
    return /^-?\d+$/.test(str);
}

export default isNumericString;