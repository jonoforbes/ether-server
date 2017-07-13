import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Schema } from "mongoose";

var messageSchema: Schema = new mongoose.Schema({
    content: {type: String, required: true},

    recipientId: String,
    userId: String,
    createdAt: Date
})

interface IMessageModel extends IMessage, mongoose.Document{
}

interface IMessage {
    content: String;
    
    recipientId: String;
    userId: String;
    createdAt: Date;
}




export var Message: Model<IMessageModel> = mongoose.model<IMessageModel>("Message", messageSchema);

