import { loginService } from "../services/systems.service";

export const loginController = async (req, res) => {
    try {
        return res.status(200).json(await loginService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};
