"use strict";
const mongoose = require("mongoose");
var clientDocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: String,
    description: String,
    folderId: String,
    accountId: String,
    contactId: String,
    saleId: String,
    boxFileId: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date,
});
exports.ClientDocument = mongoose.model("ClientDocument", clientDocumentSchema);
//# sourceMappingURL=ClientDocumentSchema.js.map