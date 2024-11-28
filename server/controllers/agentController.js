import { Affiliate } from '../models/affiliateModel.js';
import { Agent, User } from '../models/userModel.js';
import { Contract } from '../models/insuranceModel.js';

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
        console.log(newAgent);
        await newAgent.save();
        res.status(201).json({ message: 'Agent created successfully', agent: newAgent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating agent', error: error.message });
    }
};


export const getAgentByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const agent = await Agent.findOne({ user: id }).populate('user').populate('affiliate');
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving agent', error: error.message });
    }
};

export const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find().populate('user').populate('affiliate');
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving agents', error: error.message });
    }
};

export const getContractsByAgentAffiliate = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the agent based on the user ID and populate affiliate details
        const agent = await Agent.findOne({ user: id }).populate('affiliate');
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        // Fetch contracts for the affiliate with status "SIGNED" and populate all references
        const contracts = await Contract.find({ 
            affiliate: agent.affiliate._id, 
            status: "SIGNED" 
        })
        .populate('client') // Populate client data
        .populate('affiliate') // Populate affiliate data
        .populate('insuranceObject') // Populate insurance object data
        .populate('insuranceRisks'); // Populate insurance risks array

        // Return the fully populated contracts
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contracts', error: error.message });
    }
};


