
const generateAccountAddress = () => {
    const length = 38;
    let accountAddress = "0x";
    const min = 0, max = 15;
    for(let i = 0; i < length;i++) {
        let randomNumer = Math.floor(Math.random() * max) + min;
        accountAddress += decToHex(randomNumer);
    }
    return accountAddress;
}

const decToHex = (num) => {
    if(num<10) {
        return num;
    }
    else {
        return 'A' + (num - 10);
    }
}

export default generateAccountAddress;