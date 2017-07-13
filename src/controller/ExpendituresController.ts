import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Expenditure } from "../schema/ExpenditureSchema";
import { User } from "../schema/UserSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_EXPENDITURES_ADD: string = "DATA_EXPENDITURES_ADD";
const DATA_EXPENDITURES_REMOVE: string = "DATA_EXPENDITURES_REMOVE";
const DATA_EXPENDITURES_UPDATE: string ="DATA_EXPENDITURES_UPDATE";
const DATA_EXPENDITURES_ADD_ALL: string ="DATA_EXPENDITURES_ADD_ALL";

@JsonController("/api/expenditures")
export class ExpendituresController {
    constructor() {

    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Expenditure.find({userId: new ObjectID(userId)}, (error: any, expenditures: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting expenditures');
            res.send(expenditures);
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
                Expenditure.find({_id: {'$ne': null}}, (error: any, expenditures: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    res.send(expenditures);

                })
                
            }
        })
        
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Expenditure.find({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any, docs: any) => {
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
        new Expenditure(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_EXPENDITURES_ADD, payload: {expenditure: response}});
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Expenditure.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, req, {type: DATA_EXPENDITURES_UPDATE, payload: {_id: response._id, expenditure: req.body}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Expenditure.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
            this.handleRt(userId, req, {type: DATA_EXPENDITURES_REMOVE, payload: {_id: req.params.id}});
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