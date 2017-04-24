"use strict";
const mongoose = require("mongoose");
var addressSchema = new mongoose.Schema({
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
    createdAt: Date,
    userId: String
});
exports.Address = mongoose.model("Address", addressSchema);
//# sourceMappingURL=AddressSchema.js.map