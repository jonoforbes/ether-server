import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Message } from "../schema/MessagesSchema";
import { ActivitiesController } from "./ActivitiesController";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_MESSAGES_ADD: string = "DATA_MESSAGES_ADD";
const DATA_MESSAGES_REMOVE: string = "DATA_MESSAGE_REMOVE";
const DATA_MESSAGES_UPDATE: string ="DATA_MESSAGES_UPDATE";
const DATA_MESSAGES_ADD_ALL: string ="DATA_MESSAGES_ADD_ALL";

var activitiesController: ActivitiesController = new ActivitiesController;

@JsonController("/api/messages")
export class MessagesController {
    constructor() {
    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        Message.find({ $or:[ {userId: queryUserId}, {recipientId: queryUserId} ]}, 
            (error: any, messages: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting messages');
            res.send(messages);
        });
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        let queryObjectId: string = new ObjectID(req.params.id).toString();
        console.log('user', queryUserId);
        console.log('recipient', queryObjectId);
        Message.find(
                {   

                    $or: [
                        {
                            $and: [
                                {userId: queryUserId},
                                {recipientId: queryObjectId}
                            ]
                        },
                        {
                            $and: [
                                {userId: queryObjectId},
                                {recipientId: queryUserId}
                            ]
                        }
                    ]

                    
                    
                }, (error: any, messages: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('messages', messages);
            res.send(messages);
        });
    }

    @Post("/")
    public post(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let recipientId: string = req.body.recipientId;
        console.log(req.body);
        req.body.userId = userId;
        new Message(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, recipientId, req, {type: DATA_MESSAGES_ADD, payload: {message: response}});
                // activityController.post(response, 'message');
                // console.log('notification sent from message controller');
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        let recipientId: string = req.body.recipientId;
        let queryObjectId: string = new ObjectID(req.params.id).toString();
        Message.findOneAndUpdate({
                    $and: [
                        {_id: queryObjectId},
                        {
                            $or:[
                                {userId: queryUserId}, 
                                {recipientId: queryUserId}
                            ]
                        }
                    ]
                    
                    
                }, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, recipientId, req, {type: DATA_MESSAGES_UPDATE, payload: {_id: response._id, contact: req.body}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        let recipientId: string = req.body.recipientId;
        let queryObjectId: string = new ObjectID(req.params.id).toString();
        Message.remove({
                    $and: [
                        {_id: queryObjectId},
                        {
                            $or:[
                                {userId: queryUserId}, 
                                {recipientId: queryUserId}
                            ]
                        }
                    ]
                    
                    
                }, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
            this.handleRt(userId, recipientId, req, {type: DATA_MESSAGES_REMOVE, payload: {_id: req.params.id}});
            res.sendStatus(200)
            }
        });
    }




    private handleRt(userId: string, recipientId: string, req: Request, action: {type: string, payload: any}): void {

        console.log(userId);
        console.log(recipientId);
        if(!clientIdsMap[userId] && !clientIdsMap[recipientId]) {
            console.log("Case 1")
            return;
        }
        else if(clientIdsMap[userId] && !clientIdsMap[recipientId]) {
            clientIdsMap[userId]
            .filter((clientInfo: {clientId: string, jwtToken: string}) => {
                return clientInfo.jwtToken !== getToken(req);
            })
            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
            
        }
        else if(!clientIdsMap[userId] && clientIdsMap[recipientId]) {
            clientIdsMap[recipientId]
            .filter((clientInfo: {clientId: string, jwtToken: string}) => {
                return clientInfo.jwtToken !== getToken(req);
            })
            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
        }
        else {
        clientIdsMap[userId]
            .filter((clientInfo: {clientId: string, jwtToken: string}) => {
                return clientInfo.jwtToken !== getToken(req);
            })
            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
        clientIdsMap[recipientId]
            .filter((clientInfo: {clientId: string, jwtToken: string}) => {
                return clientInfo.jwtToken !== getToken(req);
            })
            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });  
        }  
    }
}

