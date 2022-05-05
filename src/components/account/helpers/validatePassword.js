import isNumericString from "./isNumericString";

const validatePassword = (password) => {
    if(!password) {
        return "Password is undefined";
    } 
    else if(password.length != 6 || !isNumericString(password)) {
        return "Password is invalid";
    }

    return "";
}

export default validatePassword;