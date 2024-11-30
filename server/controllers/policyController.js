import { Policy, Contract} from '../models/insuranceModel.js';
import { Agent } from '../models/userModel.js';

export const getPolicies = async (req, res) => {
    try {
        const policies = await Policy.find().populate("agent contract");
        res.status(200).json(policies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPolicy = async (req, res) => {
    const userId = req.body.agent;
    try {
        const agent = await Agent.findOne({ user: userId });
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        req.body.agent = agent._id;
        const policy = new Policy(req.body);
        const newPolicy = await policy.save();
        const contract = await Contract.findById(req.body.contract);
        if (!contract) {
            return res.status(404).json({ message: 'Contract not found' });
        }
        if (contract.status === "SIGNED") {
            contract.status = "CONFIRMED";
            await contract.save();
        } else {
            return res.status(400).json({ message: 'Contract status is not SIGNED, unable to update' });
        }
        res.status(201).json({ newPolicy, updatedContract: contract });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};



