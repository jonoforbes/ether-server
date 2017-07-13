"use strict";
const mongoose = require("mongoose");
var addressSchema = new mongoose.Schema({
    addressType: String,
    primaryAddress: Boolean,
    longitude: Number,
    latitude: Number,
    formattedName: String,
    houseNumber: String,
    streetName: String,
    city: String,
    postCode: String,
    country: String,
    startDate: Date,
    endDate: Date,
    contactId: String,
    accountId: String,
    bankAccountId: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String
});
exports.Address = mongoose.model("Address", addressSchema);
//# sourceMappingURL=AddressSchema.js.map