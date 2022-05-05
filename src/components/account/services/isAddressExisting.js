import Account from "../model";

const isAddressExisting = async (address) => {
    const account = await Account.findOne({ address: address })
        .select(['-password']);
    return account != null;
}

export default isAddressExisting;