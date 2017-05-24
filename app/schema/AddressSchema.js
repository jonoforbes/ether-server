"use strict";
const mongoose = require("mongoose");
var addressSchema = new mongoose.Schema({
    addressType: String,
    longitude: Number,
    latitude: Number,
    formattedName: String,
    houseNumber: String,
    streetName: String,
    city: String,
    postCode: String,
    country: String,
    contactId: String,
    accountId: String,
    bankAccountId: String,
    addressSince: String,
    createdAt: Date,
    userId: String
});
exports.Address = mongoose.model("Address", addressSchema);
//# sourceMappingURL=AddressSchema.js.map