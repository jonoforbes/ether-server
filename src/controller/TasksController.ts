import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Task } from "../schema/TaskSchema";
import { NotificationsController } from "./NotificationsController";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_TASKS_ADD: string = "DATA_TASKS_ADD";
const DATA_TASKS_REMOVE: string = "DATA_TASKS_REMOVE";
const DATA_TASKS_UPDATE: string ="DATA_TASKS_UPDATE";
const DATA_TASKS_ADD_ALL: string ="DATA_TASKS_ADD_ALL";

var notificationsController: NotificationsController = new NotificationsController;

@JsonController("/api/tasks")
export class TasksController {
    constructor() {
    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        Task.find({ $or:[ {userId: queryUserId}, {recipientId: queryUserId} ]}, 
            (error: any, tasks: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting tasks');
            res.send(tasks);
        });
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        let queryObjectId: string = new ObjectID(req.params.id).toString();
        console.log('user', queryUserId);
        console.log('_id', queryObjectId);
        Task.find(
                {   

                    $or: [
                        {
                            $and: [
                                {userId: queryUserId},
                                {_id: queryObjectId}
                            ]
                        },
                        {
                            $and: [
                                {recipientId: queryUserId},
                                {_id: queryObjectId}
                            ]
                        }
                    ]

                    
                    
                }, (error: any, tasks: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('tasks', tasks);
            res.send(tasks[0]);
        });
    }

    @Post("/")
    public post(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let recipientId: string = req.body.recipientId;
        let ownerId: string = req.body.userId;
        req.body.userId = userId;
        new Task(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, recipientId, req, {type: DATA_TASKS_ADD, payload: {task: response}});
                notificationsController.post(response, 'addTask');
                console.log('notification sent from task controller');
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let recipientId: string = req.body.recipientId;
        let ownerId: string = req.body.userId;
        console.log(req.body);
        let queryUserId: string = new ObjectID(userId).toString();
        let queryObjectId: string = new ObjectID(req.params.id).toString();
        Task.findOneAndUpdate(
            {
            
                $or: [
                        {
                            $and: [
                                {userId: queryUserId},
                                {_id: queryObjectId}
                            ]
                        },
                        {
                            $and: [
                                {recipientId: queryUserId},
                                {_id: queryObjectId}
                            ]
                        }
                    ]

            }, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(ownerId, recipientId, req, {type: DATA_TASKS_UPDATE, payload: {_id: response._id, task: req.body}});
                notificationsController.post(response, 'completeTask');
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Task.find({_id: new ObjectID(req.params.id)}, (error: any, docs: any) => {
            if (docs) {
                let recipientId = docs[0].recipientId;
                console.log('recipient', recipientId);
                Task.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    else {
                        this.handleRt(userId, recipientId, req, {type: DATA_TASKS_REMOVE, payload: {_id: req.params.id}});
                        res.sendStatus(200);
                    }
                });

            }
            

            // let recipientId = docs[0].recipientId;
        //     Task.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
        //     if (error) {
        //         res.send(error);
        //         return;
        //     }
        //     else {
        //     this.handleRt(userId, recipientId, req, {type: DATA_TASKS_REMOVE, payload: {_id: req.params.id}});
        //     res.sendStatus(200);
        //     }
        // });
        })
        
    }




     private handleRt(userId: string, recipientId: string, req: Request, action: {type: string, payload: any}): void {

        console.log('user', userId);
        console.log('recipient', recipientId);
        if(userId === recipientId) {
            console.log('same user as recipient');
            clientIdsMap[userId]
            .filter((clientInfo: {clientId: string, jwtToken: string}) => {
                return clientInfo.jwtToken !== getToken(req);
            })
            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
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

