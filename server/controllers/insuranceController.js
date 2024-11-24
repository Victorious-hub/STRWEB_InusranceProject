import { InsuranceObject} from '../models/insuranceModel.js';

export const createInsuranceObject = async (req, res) => {
    try {
        console.log(req.body);
        const insuranceObject = new InsuranceObject(req.body);
        await insuranceObject.save();
        res.status(201).json(insuranceObject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInsuranceObjects = async (req, res) => {
    try {
        const insuranceObjects = await InsuranceObject.find();
        res.status(200).json(insuranceObjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
