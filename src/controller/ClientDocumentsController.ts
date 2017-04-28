import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { ClientDocument } from "../schema/ClientDocumentSchema";
import { User } from "../schema/UserSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
import { getBoxUserAPIClient } from "../box-api";
var jwt: any = require("jsonwebtoken");

const DATA_CLIENT_DOCUMENTS_ADD: string = "DATA_CLIENT_DOCUMENTS_ADD";
const DATA_CLIENT_DOCUMENTS_REMOVE: string = "DATA_CLIENT_DOCUMENTS_REMOVE";
const DATA_CLIENT_DOCUMENTS_UPDATE: string ="DATA_CLIENT_DOCUMENTS_UPDATE";
const DATA_CLIENT_DOCUMENTS_ADD_ALL: string ="DATA_CLIENT_DOCUMENTS_ADD_ALL";

@JsonController("/api/clientdocuments")
export class ClientDocumentsController {
    constructor() {
    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        ClientDocument.find({userId: new ObjectID(userId)}, (error: any, clientDocuments: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting documents');
            res.send(clientDocuments);
        });
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
                return
            }
            else {
                ClientDocument.find({_id: {'$ne': null}}, (error: any, clientDocuments: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    res.send(clientDocuments);

                })
                
            }
        })
        
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        ClientDocument.find({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            res.send(docs[0]);
        });
    }

    @Put("/:id/sign")
    public putSign(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        User.find({_id: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                let boxUserId = docs[0].boxUserId;
                let options = {};
                getBoxUserAPIClient(boxUserId).content.files.get(req.body.boxFileId, options, function(err, data) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    else {
                        console.log(data);
                        return;
                    }
                })
            }
        })

    }

    @Post("/")
    public post(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        req.body.userId = userId;
        
        new ClientDocument(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_CLIENT_DOCUMENTS_ADD, payload: {clientDocument: response}});
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        ClientDocument.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, req, {type: DATA_CLIENT_DOCUMENTS_UPDATE, payload: {_id: response._id, clientDocument: req.body}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        ClientDocument.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
            this.handleRt(userId, req, {type: DATA_CLIENT_DOCUMENTS_REMOVE, payload: {_id: req.params.id}});
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
}

