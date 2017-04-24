"use strict";
const mongoose = require("mongoose");
var messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    recipientId: String,
    userId: String,
    createdAt: Date
});
exports.Message = mongoose.model("Message", messageSchema);
//# sourceMappingURL=MessagesSchema.js.map