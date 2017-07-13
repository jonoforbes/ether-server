import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var taskSchema: Schema = new mongoose.Schema({
    content: {type: String, required: true},
    dueDate: Date,
    isCompleted: Boolean,

    contactId: String,
    accountId: String,
    saleId: String,
    recipientId: String,
    userId: String, 
    createdAt: Date
})

interface ITaskModel extends ITask, mongoose.Document{
}

interface ITask {
    content: String,
    dueDate: Date,
    isCompleted: Boolean,

    contactId: String,
    accountId: String,
    saleId: String,
    recipientId: String,
    userId: String, 
    createdAt: Date
}

export var Task: Model<ITaskModel> = mongoose.model<ITaskModel>("Task", taskSchema);

