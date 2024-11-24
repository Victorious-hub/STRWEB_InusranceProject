import { InsuranceRisk} from '../models/insuranceModel.js';

export const createInsuranceRisk = async (req, res) => {
    try {
        const insuranceRisk = new InsuranceRisk(req.body);
        await insuranceRisk.save();
        res.status(201).json(insuranceRisk);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInsuranceRisks = async (req, res) => {
    try {
        const insuranceRisks = await InsuranceRisk.find().populate('insuranceObject');
        res.status(200).json(insuranceRisks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
