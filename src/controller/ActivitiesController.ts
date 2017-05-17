import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Activity } from "../schema/ActivitySchema";
import { UserData } from "../schema/UserDataSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_ACTIVITIES_ADD: string = "DATA_ACTIVITIES_ADD";
const DATA_ACTIVITIES_REMOVE: string = "DATA_ACTIVITIES_REMOVE";
const DATA_ACTIVITIES_UPDATE: string = "DATA_ACTIVITIES_UPDATE";
const DATA_ACTIVITIES_ADD_ALL: string = "DATA_ACTIVITIES_ADD_ALL";

@JsonController("api/activities")
export class ActivitiesController {
    constructor() {
    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Activity.find({recipientId: new ObjectID(userId)}, (error: any, activities: any) => {
                if (error) {
                    res.send(error);
                    return;
                }
                else {
                    console.log('activities');
                    res.send(activities);
                }
            });
    }
    
}






    // public post(@Req() req: any, notificationType: String): void {
    //     // console.log('notification body', req.body);
    //     // console.log('notification', req);
    //     if (notificationType == 'message') {
    //         console.log('notification for a message');
    //         UserData.find({userId: req.userId}, (error: any, docs: any) => {
    //             if (error) {
    //                 console.log(error);
    //                 return;
    //             }
    //             else {
    //                 var notificationHeader = `${docs[0].firstName} sent you a message`;
    //                 var notificationBody = {
    //                     header: notificationHeader,
    //                     content: req.content,
    //                     type: notificationType,
    //                     recipientId: req.recipientId,
    //                     messageId: req._id,
    //                     seen: false
    //                 };
    //                 console.log('pres save', notificationBody);
    //                 new Notification(notificationBody).save((error: any, response: any) => {
    //                     if (error) {
    //                         console.log('error', error);
    //                     }
    //                     else {
    //                         console.log('notification added', response);
    //                     }
    //                 })
    //                 return;
    //             }
    //         });            
    //     }
    //     if (notificationType == 'addTask') {
    //         console.log('notification for add task');
    //         UserData.find({userId: req.userId}, (error: any, docs: any) => {
    //             if (error) {
    //                 console.log(error);
    //                 return;
    //             }
    //             else {
    //                 var notificationHeader = `${docs[0].firstName} sent you a task`;
    //                 var notificationBody = {
    //                     header: notificationHeader,
    //                     content: req.content,
    //                     type: notificationType,
    //                     recipientId: req.recipientId,
    //                     taskId: req._id,
    //                     seen: false
    //                 };
    //                 console.log('pre save', notificationBody);
    //                 new Notification(notificationBody).save((error: any, response: any) => {
    //                     if (error) {
    //                         console.log('error', error);
    //                         return;
    //                     }
    //                     else {
    //                         console.log('notification added', response);
    //                         return;
    //                     }
    //                 })
                    
    //             }
    //         })
    //     }
    //     if (notificationType == 'completeTask') {
    //         console.log('notification for complete task');
    //         UserData.find({userId: req.userId}, (error: any, docs: any) => {
    //             if (error) {
    //                 console.log(error);
    //                 return;
    //             }
    //             else {
    //                 var notificationHeader = `${docs[0].firstName} completed a task`;
    //                 var notificationBody = {
    //                     header: notificationHeader,
    //                     content: req.content,
    //                     type: notificationType,
    //                     recipientId: req.userId,
    //                     taskId: req._id,
    //                     seen: false
    //                 };
    //                 console.log('pre save', notificationBody);
    //                 new Notification(notificationBody).save((errr: any, response: any) => {
    //                     if (error) {
    //                         console.log('error', error);
    //                         return;
    //                     }
    //                     else {
    //                         this.handleRt(req.userId, {type: DATA_NOTIFICATIONS_UPDATE, payload: {_id: response._id, notification: notificationBody}});
    //                         console.log('notification added', response);
    //                         return;
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     else {
    //         return;
    //     }

    // }

    // @Delete("/:id")
    // public delete(@Req() req: Request, @Res() res: Response): void {
    //     let userId: string = handleAuth(req, res);
    //     Notification.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)},
    //         (error: any) => {
    //             if (error) {
    //                 res.send(error);
    //                 return;
    //             }
    //             else {
    //                 this.handleRt(userId, {type: DATA_NOTIFICATIONS_REMOVE, payload: {_id: req.params.id}});
    //                 res.sendStatus(200);
    //             }
    //         });
    // }

    // private handleRt(userId: string, action: {type: string, payload: any}): void {

    //     if(!clientIdsMap[userId]) {
    //         return;
    //     }
    //     clientIdsMap[userId]
    //         .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
    //             io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
    //         });
    // }