import { Affiliate } from '../models/affiliateModel.js';

export const createAffiliate = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const newAffiliate = new Affiliate({ 
            name: name, 
            address: address, 
            phone: phone,
        });
        await newAffiliate.save();        
        res.status(201).json({ message: 'Affiliate created successfully', affiliate: newAffiliate });
    } catch (error) {
        res.status(500).json({ message: 'Error creating affiliate', error: error.message });
    }
};