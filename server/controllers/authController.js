import { User } from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        
        const accessToken = await generateAccessToken(user.id);
        const refreshToken = await generateRefreshToken(user.id);
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error authenticating user', error: error.message });
    }
};
