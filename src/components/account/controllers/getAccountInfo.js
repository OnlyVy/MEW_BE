import bcrypt from "bcrypt";
import AccountService from "../services";
import parseErrorIntoMessage from "../../../helpers/parseErrorIntoMessage";

const getAccountInfo = async (req, res) => {
    const { address, password } = req.body;
    try {
        if(!address || !password) {
            throw new Error("Address and password is undefined");
        }
        
        const account = await AccountService.findByAddress(address);
        if (!account) {
            throw error("Account is not exist");
        }

        if (await bcrypt.compare(password, account.password)) {
            res.status(200).json(account);
        } else {
            throw new Error("Account or password is invalid");
        }
    }
    catch (e) {
        res.status(400).json(parseErrorIntoMessage(e));
    }
}

export default getAccountInfo;