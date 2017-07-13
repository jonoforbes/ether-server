"use strict";
const mongoose = require("mongoose");
var taskSchema = new mongoose.Schema({
    content: { type: String, required: true },
    dueDate: Date,
    isCompleted: Boolean,
    contactId: String,
    accountId: String,
    saleId: String,
    recipientId: String,
    userId: String,
    createdAt: Date
});
exports.Task = mongoose.model("Task", taskSchema);
//# sourceMappingURL=TaskSchema.js.map