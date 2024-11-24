import { Schema, model } from "mongoose";


const insuranceObjectSchema = new Schema({
    insuranceType: {
        type: String,
        enum: ["MEDICAL", "AUTO", "TRAVEL", "BUSINESS"],
        required: [true, "Please fill your insurance type"],
    },
    name: {
        type: String,
    },
    decription : {
        type: String,
    }
});

const insuranceRiskSchema = new Schema({
    insuranceObject: {
        type: Schema.Types.ObjectId,
        ref: "InsuranceObject",
        required: [true, "Please fill your insurance object"],
    },
    name: {
        type: String,
        required: [true, "Please fill your insurance risk name"],
    },
})

const contractSchema = new Schema({
    status: {
        type: String,
        enum: ["CREATED", "CONFIRMED", "COMPLETED"],
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: [true, "Please fill your client"],
    },
    affiliate: {
        type: Schema.Types.ObjectId,
        ref: "Affiliate",
        required: [true, "Please fill your affiliate"],
    },

});

const policySchema = new Schema({
    agent: {
        type: Schema.Types.ObjectId,
        ref: "Agent",
        required: [true, "Please fill your agent"],
    },
    contract: {
        type: Schema.Types.ObjectId,
        ref: "Contract",
        required: [true, "Please fill your contract"],
    },
    insuranceSum: {
        type: Number,
        required: [true, "Please fill your insurance sum"],
    },
    price: {
        type: Number,
        required: [true, "Please fill your price"],
    },
    startDate: {
        type: Date,
        required: [true, "Please fill your start date"],
    },
    endDate: {
        type: Date,
        required: [true, "Please fill your end date"],
    },
});

insuranceObjectSchema.pre('findOneAndDelete', async function(next) {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
        await InsuranceRisk.deleteMany({ insuranceObject: doc._id });
        await Contract.deleteMany({ insuranceObject: doc._id });
    }
    next();
});

contractSchema.pre('findOneAndDelete', async function(next) {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
        await Policy.deleteMany({ contract: doc._id });
    }
    next();
});

const InsuranceObject = model('InsuranceObject', insuranceObjectSchema);
const InsuranceRisk = model('InsuranceRisk', insuranceRiskSchema);
const Contract = model('Contract', contractSchema);
const Policy = model('Policy', policySchema);

export { InsuranceObject, InsuranceRisk, Contract, Policy };