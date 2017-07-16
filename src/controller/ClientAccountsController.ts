import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { ClientAccount } from "../schema/ClientAccountSchema";
import { User } from "../schema/UserSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_CLIENT_ACCOUNTS_ADD: string = "DATA_CLIENT_ACCOUNTS_ADD";
const DATA_CLIENT_ACCOUNTS_REMOVE: string = "DATA_CLIENT_ACCOUNTS_REMOVE";;
const DATA_CLIENT_ACCOUNTS_UPDATE: string = "DATA_CLIENT_ACCOUNTS_UPDATE";
const DATA_CLIENT_ACCOUNTS_ADD_ALL: string = "DATA_CLIENT_ACCOUNTS_ADD_ALL";

@JsonController("/api/clientaccounts")
export class ClientAccountsController {
    constructor() {

    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        User.find({_id: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            if (docs[0].role === 0) {
                ClientAccount.find({}, (error: any, clientAccounts: any) => {
                    if(error) {
                        res.send(error)
                        return
                    }
                    else {
                        res.send(clientAccounts)
                        return
                    }
                })
            }
            else {
                ClientAccount.find({userId: new ObjectID(userId)}, (error: any, clientAccounts: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    else {
                        res.send(clientAccounts);
                        return;
                    }
                });
            }
        }) 
        
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        ClientAccount.find({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                res.send(docs[0]);
                return;
            }
            
        });
    }

    @Post("/")
    public post(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        req.body.userId = userId;
        new ClientAccount(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(response.userId, req, {type: DATA_CLIENT_ACCOUNTS_ADD, payload: {clientAccount: response}});
                this.handleAdminRt(req, {type: DATA_CLIENT_ACCOUNTS_ADD, payload: {clientAccount: response}});
                res.send(response);
                return;
            }
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        ClientAccount.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
                return;
            }
            else {
                this.handleRt(response.userId, req, {type: DATA_CLIENT_ACCOUNTS_UPDATE, payload: {_id: response._id, clientAccount: req.body}});
                this.handleAdminRt(req, {type: DATA_CLIENT_ACCOUNTS_UPDATE, payload: {_id: response._id, clientAccount: req.body}});
                res.send(response);
                return;
            }
        });
    }

    @Delete("/:id")
    public delete(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        ClientAccount.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_CLIENT_ACCOUNTS_REMOVE, payload: {_id: req.params.id}});
                this.handleAdminRt(req, {type: DATA_CLIENT_ACCOUNTS_REMOVE, payload: {_id: req.params.id}});
                res.sendStatus(200);
                return;
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