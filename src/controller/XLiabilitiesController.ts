import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { XLiability } from "../schema/XLiabilitySchema";
import { User } from "../schema/UserSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_XLIABILITIES_ADD: string = "DATA_XLIABILITIES_ADD";
const DATA_XLIABILITIES_REMOVE: string = "DATA_XLIABILITIES_REMOVE";
const DATA_XLIABILITIES_UPDATE: string ="DATA_XLIABILITIES_UPDATE";
const DATA_XLIABILITIES_ADD_ALL: string ="DATA_XLIABILITIES_ADD_ALL";

@JsonController("/api/xliabilities")
export class XLiabilitiesController {
    constructor() {

    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        XLiability.find({userId: new ObjectID(userId)}, (error: any, xLiabilities: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting existing liabilities');
            res.send(xLiabilities);
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
                XLiability.find({_id: {'$ne': null}}, (error: any, xLiabilities: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    res.send(xLiabilities);

                })
                
            }
        })
        
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        XLiability.find({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any, docs: any) => {
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
        new XLiability(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_XLIABILITIES_ADD, payload: {xLiability: response}});
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        XLiability.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, req, {type: DATA_XLIABILITIES_UPDATE, payload: {_id: response._id, xLiability: req.body}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        XLiability.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
            this.handleRt(userId, req, {type: DATA_XLIABILITIES_REMOVE, payload: {_id: req.params.id}});
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