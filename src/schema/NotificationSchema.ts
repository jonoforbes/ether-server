import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var notificationSchema: Schema = new mongoose.Schema({
    content: {type: String, required: true},
    messageId: String,
    taskId: String,
    userId: String,
    recipientId: String,
    createdAt: Date,
    seen: Boolean
})

interface INotificationModel extends INotification, mongoose.Document {

}

interface INotification {
    content: String,
    messageId: String,
    taskId: String,
    userId: String,
    recipientId: String,
    createdAt: Date,
    seen: Boolean
}

export var Notification: Model<INotificationModel> = mongoose.model<INotificationModel>("Notification", notificationSchema);