import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Notification } from "../schema/NotificationSchema";
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
        Notification.find({userId: queryUserId},
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
    public post(@Req() req: Request, @Res() res: Response, notificationType: String): void {
        console.log('notification body', req.body);
        if (notificationType == 'message') {
            console.log('notification for a message');
            return;
        }
        if (notificationType == 'task') {
            console.log('notification for a task');
            return;
        }
    }
}