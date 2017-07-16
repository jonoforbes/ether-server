import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Dependant } from "../schema/DependantSchema";
import { User } from "../schema/UserSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_DEPENDANTS_ADD: string = "DATA_DEPENDANTS_ADD";
const DATA_DEPENDANTS_REMOVE: string = "DATA_DEPENDANTS_REMOVE";
const DATA_DEPENDANTS_UPDATE: string ="DATA_DEPENDANTS_UPDATE";
const DATA_DEPENDANTS_ADD_ALL: string ="DATA_DEPENDANTS_ADD_ALL";

@JsonController("/api/dependants")
export class DependantsController {
    constructor() {

    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        User.find({_id: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return
            }
            if (docs[0].role === 0) {
                Dependant.find({}, (error: any, dependants: any) => {
                    if (error) {
                        res.send(error)
                        return
                    }
                    res.send(dependants)
                });
            }
            else {
                Dependant.find({userId: new ObjectID(userId)}, (error: any, dependants: any) => {
                    if (error) {
                        res.send(error)
                        return
                    }
                    res.send(dependants)
                });
            }
        })   

    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Dependant.find({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            res.send(docs[0]);
        });
    }

    @Post("/")
    public post(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        req.body.userId = userId;
        new Dependant(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_DEPENDANTS_ADD, payload: {dependant: response}});
                this.handleAdminRt(req, {type: DATA_DEPENDANTS_ADD, payload: {dependant: response}});
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Dependant.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, req, {type: DATA_DEPENDANTS_UPDATE, payload: {_id: response._id, dependant: req.body}});
                this.handleAdminRt(req, {type: DATA_DEPENDANTS_UPDATE, payload: {_id: response._id, dependant: req.body}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Dependant.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
            this.handleRt(userId, req, {type: DATA_DEPENDANTS_REMOVE, payload: {_id: req.params.id}});
            this.handleAdminRt(req, {type: DATA_DEPENDANTS_REMOVE, payload: {_id: req.params.id}});
            res.sendStatus(200);
            }
        });
    }

    private handleRt(userId: string, req: Request, action: {type: string, payload: any}): void {

        if(!clientIdsMap[userId]) {
            return;
        }
        clientIdsMap[userId]
            .filter((clientInfo: {clientId: string, jwtToken: string}) => {
                return clientInfo.jwtToken !== getToken(req);
            })
            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
            });
    }

    private 

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