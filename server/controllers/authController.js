import { User } from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        // if (!user || !(await user.correctPassword(password, user.password))) {
        //     return res.status(401).json({ message: 'Incorrect email or password' });
        // }
        
        const accessToken = await generateAccessToken(user.id, user.role);
        const refreshToken = await generateRefreshToken(user.id);
        console.log(accessToken);
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error authenticating user', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
};