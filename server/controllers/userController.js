import { User, Client } from '../models/userModel.js';

export const createClient = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = new User(req.body);
        
        const age = Math.floor((new Date() - new Date(req.body.birthdate).getTime()) / 3.15576e+10);
        newUser.age = age;
        await newUser.save();

        const newClient = new Client({
            address: null,
            phoneNumber: null,
            user: newUser._id
        });
        await newClient.save();
        
        res.status(201).json({ message: 'Client created successfully', user: newClient });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};


export const getClients = async (req, res) => {
    try {
        const clients = await Client.find().populate('user');
        res.status(200).json({ clients });
    } catch (error) {
        res.status(500).json({ message: 'Error getting clients', error: error.message });
    }
};

export const getClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const client = await Client.findById(clientId).populate('user');
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ client });
    } catch (error) {
        res.status(500).json({ message: 'Error getting client', error: error.message });
    }
};


export const updateUserCreds = async (req, res) => {
    try {
        const { userId } = req.params;
        const { first_name, last_name, profile_image, address, phone_number } = req.body;

        const updatedFields = {
            firstName: first_name,
            lastName: last_name,
            profileImage: req.file ? `/uploads/${req.file.filename}` : profile_image,
        };

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const clientUpdateFields = { address, phoneNumber: phone_number };
        const updatedClient = await Client.findOneAndUpdate(
            { user: userId },
            clientUpdateFields,
            { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
        );

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        updatedUser.profileImage = `${baseUrl}${updatedUser.profileImage}`;

        res.status(200).json({
            user: updatedUser,
            client: updatedClient,
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating user credentials', 
            error: error.message 
        });
    }
};

