import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Response, Request } from "express";
import { ObjectID } from "mongodb";
import { Address } from "../schema/AddressSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";

var jwt: any = require("jsonwebtoken");

const DATA_ADDRESSES_ADD: string = "DATA_ADDRESSES_ADD";
const DATA_ADDRESSES_REMOVE: string = "DATA_ADDRESSES_REMOVE";
const DATA_ADDRESSES_UPDATE: string = "DATA_ADDRESSES_UPDATE";
const DATA_ADDRESSES_ADD_ALL: string = "DATA_ADDRESSES_ADD_ALL";

@JsonController("/api/addresses")
export class AddressesController {
    constructor() {

    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Address.find({userId: new ObjectID(userId)}, (error: any, addresses: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting addresses');
            res.send(addresses);
        });
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Address.find({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('get by id');
            res.send(docs[0]);
        });
    }

    @Post("/")
    public postMessage(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        req.body.userId = userId;
        new Address(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_ADDRESSES_ADD, payload: {address: response}});
                res.send(response);
            }
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Address.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.postMessage(req, res);
            }
            else {
                this.handleRt(userId, req, {type: DATA_ADDRESSES_UPDATE, payload: {_id: response._id, address: req.body}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Address.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_ADDRESSES_REMOVE, payload: {_id: req.params.id}});
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