import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";
import { Currency } from "../constants";

var xPensionSchema: Schema = new mongoose.Schema({              // = money purchase   /// = defined benefits
    pensionType: String,                        /////   Pension Type [ Money Purchase | Defined Benefits ]
    providerName: String,                       /////   Provider Name
    planType: String,                           /////   Plan Type
    policyNumber: String,                       /////   Policy Number
    planJoinDate: Date,                         /////   Plan Join Date
    status: String,                             /////   Status
    planRetirementAge: Number,                  /////   Plan / Scheme Retirement Age
    personalContribution: Number,               /////   Personal Contribution
    contributionFrequency: String,              /////   Contribution Frequency
    assetPreservationTrust: Boolean,            /////   Is existing DIS Benefit in an Asset Preservation Trust?
    contractedOut: Boolean,                     /////   Contracted out?
    planStartDate: Date,                        //      Plan Start Date
    planLeaveDate: Date,                        ///     Plan Leave Date
    extraYears: Number,                         ///     Extra years credited from transfer
    companyJoinDate: Date,                      ///     Company Join Date
    valuationAmount: Number,                    //      Valuation
    taxFreeCurrentValue: Number,                //      Tax Free Cash Current Value
    employerContribution: Number,               //      Employer Contribution
    waiver: String,                             //      Yes | No | No but can be added | N/A | Unknown
    coverLevel: String,                         //      Level Of Life Cover Provided
    lumpSum: String,                            //      Lump Sum Death Benefit = [ Return of Premium | Return of Fund | Premium with Interest | No Return ]
    deathInServiceLumpSum: String,              ///     Death in Service Lump Sum Benefit
    paidUpDate: Date,                         //      If paid up from when?
    transferValue: Number,                      //      Transfer Value
    transferDate: Date,                         //      Date Of Transfer
    protectedRights: String,                    //      Protected Rights
    nonProtectedRights: String,                 //      Non-Protected Rights
    pensionableEarnings: Number,                ///     Scheme Pensionable Earnings
    pensionIncreaseRate: String,                ///     Pension Increase Rate
    spousePension: String,                      ///     Spouse Pension
    dependantPension: String,                   ///     Dependant Pension
    currency: Number,

    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
})

interface IXPension {
    pensionType: String;                        /////   Pension Type [ Money Purchase | Defined Benefits ]
    providerName: String;                       /////   Provider Name
    planType: String;                           /////   Plan Type
    policyNumber: String;                       /////   Policy Number
    planJoinDate: Date;                         /////   Plan Join Date
    status: String;                             /////   Status
    planRetirementAge: Number;                  /////   Plan / Scheme Retirement Age
    personalContribution: Number;               /////   Personal Contribution
    contributionFrequency: String;              /////   Contribution Frequency
    assetPreservationTrust: Boolean;            /////   Is existing DIS Benefit in an Asset Preservation Trust?
    contractedOut: Boolean;                     /////   Contracted out?
    planStartDate: Date;                        //      Plan Start Date
    planLeaveDate: Date;                        ///     Plan Leave Date
    extraYears: Number;                         ///     Extra years credited from transfer
    companyJoinDate: Date;                      ///     Company Join Date
    valuationAmount: Number;                    //      Valuation
    taxFreeCurrentValue: Number;                //      Tax Free Cash Current Value
    employerContribution: Number;               //      Employer Contribution
    waiver: String;                             //      Yes | No | No but can be added | N/A | Unknown
    coverLevel: String;                         //      Level Of Life Cover Provided
    lumpSum: String;                            //      Lump Sum Death Benefit = [ Return of Premium | Return of Fund | Premium with Interest | No Return ]
    deathInServiceLumpSum: String;              ///     Death in Service Lump Sum Benefit
    paidUpDate: Date;                           //      If paid up from when?
    transferValue: Number;                      //      Transfer Value
    transferDate: Date,                         //      Date Of Transfer
    protectedRights: String,                    //      Protected Rights
    nonProtectedRights: String,                 //      Non-Protected Rights
    pensionableEarnings: Number,                ///     Scheme Pensionable Earnings
    pensionIncreaseRate: String,                ///     Pension Increase Rate
    spousePension: String,                      ///     Spouse Pension
    dependantPension: String,                   ///     Dependant Pension
    currency: Number,

    createdAt: Date,
    contactId: String,
    accountId: String,
    userId: String
}

interface IXPensionModel extends IXPension, mongoose.Document {

}

export var XPension: Model<IXPensionModel> = mongoose.model<IXPensionModel>("XPension", xPensionSchema);