import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {Schema} from "mongoose";
var contactSchema: Schema = new mongoose.Schema({

    contactType: String,

    firstName: {type: String, required: true},
    middleName: String,
    lastName: String,
    preferredName: String,
    salutation: String,
    dateOfBirth: String,
    dateOfDeath: String,
    maritalStatus: String,
    gender: String,
    dependants: [{
        relationship: String,
        name: String,
        dateOfBirth: String,
        dependant: Boolean,
        dependantEndDate: Date,
        goodHealth: Boolean
    }],
    health: {
        smoker: Boolean,
        goodHealth: Boolean,
        goodHealthNote: String,
        medicalConditions: Boolean,
        conditionsNote: String
    },
    occupation: {
        occupation: String,
        title: String,
        status: String,
        employerName: String
    },
    income: {
        tEmployment: {
            currency: String,
            amount: Number
        },
        ntEmployment: {
            currency: String,
            amount: Number
        },
        tSelfEmployedY1: {
            currency: String,
            amount: Number
        },
        ntSelfEmployedY1: {
            currency: String,
            amount: Number
        },
        tSelfEmployedY2: {
            currency: String,
            amount: Number
        },
        ntSelfEmployedY2: {
            currency: String,
            amount: Number
        },
        tPension: {
            currency: String,
            amount: Number
        },
        ntPension: {
            currency: String,
            amount: Number
        },
        tStatePension: {
            currency: String,
            amount: Number
        },
        ntStatePension: {
            currency: String,
            amount: Number
        },
        tStateBenefit: {
            currency: String,
            amount: Number
        },
        ntStateBenefit: {
            currency: String,
            amount: Number
        },
        tOther: {
            currency: String,
            amount: Number
        },
        ntOther: {
            currency: String,
            amount: Number
        }
    },
    expenditure: {
        monthlyPolicy: {
            currency: String,
            amount: Number
        },
        monthlyEssential: {
            currency: String,
            amount: Number
        },
        monthlyDiscretionary: {
            currency: String,
            amount: Number
        }
    },
    emergencyFunds: {
        available: {
            currency: String,
            amount: Number
        },
        recommended: {
            currency: String,
            amount: Number
        }
    },
    futureCircumstances: {
        willChange: Boolean,
        effect: String
    },
    tax: {
        rate: Number,
        resident: Boolean,
        domicile: Boolean,
        residenceDate: Date,
        ni: Number,
        willChange: Boolean
    },
    nationality: String,
    mobilePhone: String,
    homePhone: String,
    workPhone: String,
    primaryEmail: String,
    secondaryEmail: String,
    accountId: String,
    userId: String,
    createdAt: Date
})
export var Contact: Model<IContactModel> = mongoose.model<IContactModel>("Contact", contactSchema);
interface IContactModel extends IContact, mongoose.Document {
}
interface IContact {
    contactType: String,
    firstName: String,
    middleName: String,
    lastName: String,
    preferredName: String,
    salutation: String,
    dateOfBirth: String,
    dateOfDeath: String,
    maritalStatus: String,
    gender: String,

    dependants: [{
        relationship: String,
        name: String,
        dateOfBirth: String,
        dependant: Boolean,
        dependantEndDate: Date,
        goodHealth: Boolean
    }],
    health: {
        smoker: Boolean,
        goodHealth: Boolean,
        goodHealthNote: String,
        medicalConditions: Boolean,
        conditionsNote: String
    },
    occupation: {
        occupation: String,
        title: String,
        status: String,
        employerName: String
    },
    income: {
        tEmployment: {
            currency: String,
            amount: Number
        },
        ntEmployment: {
            currency: String,
            amount: Number
        },
        tSelfEmployedY1: {
            currency: String,
            amount: Number
        },
        ntSelfEmployedY1: {
            currency: String,
            amount: Number
        },
        tSelfEmployedY2: {
            currency: String,
            amount: Number
        },
        ntSelfEmployedY2: {
            currency: String,
            amount: Number
        },
        tPension: {
            currency: String,
            amount: Number
        },
        ntPension: {
            currency: String,
            amount: Number
        },
        tStatePension: {
            currency: String,
            amount: Number
        },
        ntStatePension: {
            currency: String,
            amount: Number
        },
        tStateBenefit: {
            currency: String,
            amount: Number
        },
        ntStateBenefit: {
            currency: String,
            amount: Number
        },
        tOther: {
            currency: String,
            amount: Number
        },
        ntOther: {
            currency: String,
            amount: Number
        }
    },
    expenditure: {
        monthlyPolicy: {
            currency: String,
            amount: Number
        },
        monthlyEssential: {
            currency: String,
            amount: Number
        },
        monthlyDiscretionary: {
            currency: String,
            amount: Number
        }
    },
    emergencyFunds: {
        available: {
            currency: String,
            amount: Number
        },
        recommended: {
            currency: String,
            amount: Number
        }
    },
    futureCircumstances: {
        willChange: Boolean,
        effect: String
    },
    tax: {
        rate: Number,
        resident: Boolean,
        domicile: Boolean,
        residenceDate: Date,
        ni: Number,
        willChange: Boolean
    },
    nationality: String,
    mobilePhone: String,
    homePhone: String,
    workPhone: String,
    primaryEmail: String,
    secondaryEmail: String,
    accountId: String,
    userId: String,
    createdAt: Date
}