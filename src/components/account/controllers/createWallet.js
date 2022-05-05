import Account from "../model";
import AccountService from "../services";
import parseErrorIntoMessage from "../../../helpers/parseErrorIntoMessage";
import validatePassword from "../helpers/validatePassword";
import generateAccountAddress from "../helpers/generateAccountAddress";

const createWallet = async (req, res) => {
    const { password } = req.body;
    try {
        const errPassword = validatePassword(password);
        if(errPassword != "") {
            throw Error(errPassword);
        }

        let accountAddress;
        do {
            accountAddress = generateAccountAddress();
        }
        while(await AccountService.isAddressExisting(accountAddress));

        const account = new Account({
            address: accountAddress,
            password,
        });

        const savedAccount = await account.save();
        res.status(200).json(savedAccount);
    }
    catch(e) {
        res.status(400).json(parseErrorIntoMessage(e));
    }
}

export default createWallet;