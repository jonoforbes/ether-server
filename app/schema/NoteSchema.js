"use strict";
const mongoose = require("mongoose");
var noteSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Note = mongoose.model("Note", noteSchema);
//# sourceMappingURL=NoteSchema.js.map