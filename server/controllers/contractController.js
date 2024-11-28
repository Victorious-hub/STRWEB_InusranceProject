import { Contract } from '../models/insuranceModel.js';
import { Client } from '../models/userModel.js';

export const createContract = async (req, res) => {
    const userId = req.body.client;
    try {
        const client = await Client.findOne({ user: userId });
        req.body.client = client._id;
        const newContract = new Contract(req.body);
        await newContract.save();
        res.status(201).json(newContract);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getContracts = async (req, res) => {
    try {
        const contracts = await Contract.find().populate('client.user.id');
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getContractById = async (req, res) => {
    const { id } = req.params;

    try {
        const contract = await Contract.findById(id)
            .populate('client')
            .populate('affiliate')
            .populate('insuranceObject')
            .populate('insuranceRisks');

        if (!contract) {
            return res.status(404).json({ message: "Contract not found." });
        }

        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getContractsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findOne({ user: id });
        if (!client) {
            return res.status(404).json({ message: "Client not found." });
        }
        const contracts = await Contract.find({client: client})
            .populate('client')
            .populate('affiliate')
            .populate('insuranceObject')
            .populate('insuranceRisks');
        if (!contracts || contracts.length === 0) {
            return res.status(404).json({ message: "No contracts found for this user." });
        }

        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const signContract = async (req, res) => {
    const { id } = req.params;

    try {
        const contract = await Contract.findById(id);

        if (!contract) {
            return res.status(404).json({ message: "Contract not found." });
        }

        contract.status = 'SIGNED';
        await contract.save();
        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteContract = async (req, res) => {
    const { id } = req.params;

    try {
        const contract = await Contract.findById(id);

        if (!contract) {
            return res.status(404).json({ message: "Contract not found." });
        }

        if (contract.status !== 'CREATED') {
            return res.status(400).json({ message: "Only contracts with status 'CREATED' can be deleted." });
        }

        await contract.deleteOne();
        res.status(200).json({ message: "Contract deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const applyContract = async (req, res) => {
    const { id } = req.params;

    try {
        const contract = await Contract.findById(id);

        if (!contract) {
            return res.status(404).json({ message: "Contract not found." });
        }

        if (contract.status !== 'CONFIRMED') {
            return res.status(400).json({ message: "Only contracts with status 'CONFIRMED' can be applied." });
        }
        contract.status = 'COMPLETED';
        await contract.save();
        console.log(contract)
        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};