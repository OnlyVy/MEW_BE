import Account from '../model';

const findByAddress = async (address) => {
    const data = await Account.findOne({address: address});

    return data;
}

export default findByAddress;