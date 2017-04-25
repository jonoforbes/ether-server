"use strict";
const mongoose = require("mongoose");
var clientDocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    accountId: String,
    contactId: String,
    saleId: String,
    boxFileId: String,
    userId: String,
    createdAt: Date
});
exports.ClientDocument = mongoose.model("ClientDocument", clientDocumentSchema);
//# sourceMappingURL=ClientDocumentSchema.js.map