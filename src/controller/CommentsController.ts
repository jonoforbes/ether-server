import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Comment } from "../schema/CommentSchema";
import { User } from "../schema/UserSchema";
import { ActivitiesController } from "./ActivitiesController";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_COMMENTS_ADD: string = "DATA_COMMENTS_ADD";
const DATA_COMMENTS_REMOVE: string = "DATA_COMMENT_REMOVE";
const DATA_COMMENTS_UPDATE: string ="DATA_COMMENTS_UPDATE";
const DATA_COMMENTS_ADD_ALL: string ="DATA_COMMENTS_ADD_ALL";

var activitiesController: ActivitiesController = new ActivitiesController;

@JsonController("/api/comments")
export class CommentsController {
    constructor() {
    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        User.find({_id: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            if (docs[0].role === 0) {
                Comment.find({}, (error: any, comments: any) => {
                    if(error) {
                        res.send(error)
                        return
                    }

                    res.send(comments)
                })
            }
            else {
                Comment.find({ $or:[ {userId: queryUserId}, {recipientId: queryUserId} ]}, 
                    (error: any, comments: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    else {
                        res.send(comments);
                    }
                });
            }
        }) 
        
    }

    @Get("/admin")
    public getAdmin(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        User.find({_id: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            if (docs[0].role !== "admin") {
                res.send(error);
                return;
            }
            else {
                Comment.find({_id: {'$ne': null}}, (error: any, comments: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    else {
                        console.log('setting admin comments');
                        res.send(comments);
                    }
                })
            }
        })
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        let queryObjectId: string = new ObjectID(req.params.id).toString();
        console.log('user', queryUserId);
        console.log('recipient', queryObjectId);
        Comment.find(
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

                    
                    
                }, (error: any, comments: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('comments', comments);
            res.send(comments);
        });
    }

    @Post("/")
    public post(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let recipientId: string = req.body.recipientId;
        console.log(req.body);
        req.body.userId = userId;
        new Comment(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(response.userId, response.recipientId, req, {type: DATA_COMMENTS_ADD, payload: {comment: response}});
                this.handleAdminRt(req, {type: DATA_COMMENTS_ADD, payload: {comment: response}});
                activitiesController.post(response, 'comment');
                console.log('notification attempted from comment controller');
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
        Comment.findOneAndUpdate({
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
                this.handleRt(userId, recipientId, req, {type: DATA_COMMENTS_UPDATE, payload: {_id: response._id, contact: req.body}});
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
        Comment.remove({
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
            this.handleRt(userId, recipientId, req, {type: DATA_COMMENTS_REMOVE, payload: {_id: req.params.id}});
            this.handleAdminRt(req, {type: DATA_COMMENTS_REMOVE, payload: {_id: req.params.id}});
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

    private handleAdminRt(req: Request, action: {type: string, payload: any}): void {
        User.find({role: 0}, (error: any, docs: any) => {
            if (error) {
                return
            }
            else {
                docs.forEach((user: any) => {
                    if(!clientIdsMap[user._id]) {
                        return
                    }
                    else {
                        clientIdsMap[user._id]
                            .filter((clientInfo: {clientId: string, jwtToken: string}) => {
                                return clientInfo.jwtToken !== getToken(req);
                            })
                            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
                            });
                    }

                })

            }

        })


    }
}

