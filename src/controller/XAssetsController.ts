import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { XAsset } from "../schema/XAssetSchema";
import { User } from "../schema/UserSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_XASSETS_ADD: string = "DATA_XASSETS_ADD";
const DATA_XASSETS_REMOVE: string = "DATA_XASSETS_REMOVE";
const DATA_XASSETS_UPDATE: string ="DATA_XASSETS_UPDATE";
const DATA_XASSETS_ADD_ALL: string ="DATA_XASSETS_ADD_ALL";

@JsonController("/api/xassets")
export class XAssetsController {
    constructor() {

    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        XAsset.find({userId: new ObjectID(userId)}, (error: any, xAssets: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting existing assets');
            res.send(xAssets);
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
                XAsset.find({_id: {'$ne': null}}, (error: any, xAssets: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    res.send(xAssets);

                })
                
            }
        })
        
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        XAsset.find({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any, docs: any) => {
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
        new XAsset(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_XASSETS_ADD, payload: {xAsset: response}});
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        XAsset.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, req, {type: DATA_XASSETS_UPDATE, payload: {_id: response._id, xAsset: req.body}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        XAsset.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
            this.handleRt(userId, req, {type: DATA_XASSETS_REMOVE, payload: {_id: req.params.id}});
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