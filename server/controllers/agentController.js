import { Affiliate } from '../models/affiliateModel.js';
import { Agent, User } from '../models/userModel.js';

export const createAgent = async (req, res) => {
    try {
        const { first_name, last_name, email, birthdate, password, re_password, tarrif_rate, salary, affiliate_name } = req.body;
        const newUser = new User({ 
            firstName: first_name, 
            lastName: last_name, 
            email: email,
            birthdate: birthdate,
            password: password, 
            passwordConfirm: re_password,
            role: "agent",
        });
        const age = Math.floor((new Date() - new Date(birthdate).getTime()) / 3.15576e+10);
        newUser.age = age;
        await newUser.save();

        const affiliate = await Affiliate.findOne({ name: affiliate_name });
        if (!affiliate) {
            return res.status(404).json({ message: 'Affiliate not found' });
        }

        const newAgent = new Agent({
            tarriffRate: tarrif_rate,
            salary: salary,
            user: newUser._id,
            affiliate: affiliate._id,
        });
        await newAgent.save();
        res.status(201).json({ message: 'Agent created successfully', agent: newAgent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating agent', error: error.message });
    }
};
