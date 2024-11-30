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


export const getInsuranceRisksByObjectId = async (req, res) => {
    const { id } = req.params;

    try {
        const insuranceRisks = await InsuranceRisk.find({ insuranceObject: id })
            .populate('insuranceObject');

        if (!insuranceRisks || insuranceRisks.length === 0) {
            return res.status(404).json({ message: "No risks found for this insurance object." });
        }

        res.status(200).json(insuranceRisks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};