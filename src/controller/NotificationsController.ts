import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Notification } from "../schema/NotificationSchema";
import { UserData } from "../schema/UserDataSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_NOTIFICATIONS_ADD: string = "DATA_NOTIFICATIONS_ADD";
const DATA_NOTIFICATIONS_REMOVE: string = "DATA_NOTIFICATIONS_REMOVE";
const DATA_NOTIFICATIONS_UPDATE: string = "DATA_NOTIFICATIONS_UPDATE";
const DATA_NOTIFICATIONS_ADD_ALL: string = "DATA_NOTIFICATIONS_ADD_ALL";

@JsonController("api/notifications")
export class NotificationsController {
    constructor() {

    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        Notification.find({recipientId: queryUserId},
            (error: any, notifications: any) => {
                if (error) {
                    res.send(error);
                    return;
                }
                else {
                    console.log('setting notifications');
                    res.send(notifications);
                }
            });
    }
    
    @Post("/")
    public post(@Req() req: any, notificationType: String): void {
        // console.log('notification body', req.body);
        // console.log('notification', req);
        if (notificationType == 'message') {
            console.log('notification for a message');
            UserData.find({userId: req.userId}, (error: any, docs: any) => {
                if (error) {
                    return;
                }
                else {
                    var notificationHeader = `${docs[0].firstName} sent you a message`;
                    var notificationBody = {
                        header: notificationHeader,
                        content: req.content,
                        recipientId: req.recipientId,
                        messageId: req._id,
                        seen: false
                    };
                    console.log(notificationBody);
                    new Notification(notificationBody).save((error: any, response: any) => {
                        if (error) {
                            console.log('error', error);
                        }
                        else {
                            this.handleRt(req.recipientId, {type: DATA_NOTIFICATIONS_ADD, payload: {notification: response}});
                        }
                    })
                    return;
                }
            });            
        }
        if (notificationType == 'task') {
            console.log('notification for a task');
            return;
        }
    }

    private handleRt(userId: string, action: {type: string, payload: any}): void {

        if(!clientIdsMap[userId]) {
            return;
        }
        clientIdsMap[userId]
            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
    }
}

