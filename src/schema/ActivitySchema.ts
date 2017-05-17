import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var activitySchema: Schema = new mongoose.Schema({
    header: {type: String, required: true},
    content: {type: String, required: true},
    type: String,
    messageId: String,
    taskId: String,
    userId: String,
    recipientId: String,
    createdAt: Date,
    seen: Boolean
})

interface IActivityModel extends IActivity, mongoose.Document {

}

interface IActivity {
    header: String,
    content: String,
    type: String,
    messageId: String,
    taskId: String,
    userId: String,
    recipientId: String,
    createdAt: Date,
    seen: Boolean
}

export var Activity: Model<IActivityModel> = mongoose.model<IActivityModel>("Activity", activitySchema);