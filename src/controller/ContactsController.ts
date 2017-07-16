import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Contact } from "../schema/ContactSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
import { User } from "../schema/UserSchema";
// import { isAdmin } from "./AuthenticationController";
var jwt: any = require("jsonwebtoken");

const DATA_CONTACTS_ADD: string = "DATA_CONTACTS_ADD";
const DATA_CONTACTS_REMOVE: string = "DATA_CONTACTS_REMOVE";
const DATA_CONTACTS_UPDATE: string ="DATA_CONTACTS_UPDATE";
const DATA_CONTACTS_ADD_ALL: string ="DATA_CONTACTS_ADD_ALL";

@JsonController("/api/contacts")
export class ContactsController {
    constructor() {
    }

    // @Get("/")
    // public get(@Req() req: Request, @Res() res: Response): void {
    //     let userId: string = handleAuth(req, res);
    //     if (isAdmin(userId)) {
    //         console.log('admin getting contacts');
    //         Contact.find({_id: {'$ne': null}}, (error: any, contacts: any) => {
    //             if(error) {
    //                 res.send(error);
    //                 return;
    //             }
    //             console.log('admin sent contacts');
    //             res.send(contacts);
    //         })

    //     }
    //     else {
    //         console.log('not an admin');
    //         Contact.find({userId: new ObjectID(userId)}, (error: any, contacts: any) => {
    //         if (error) {
    //             res.send(error);
    //             return;
    //         }
    //         console.log('setting contacts');
    //         res.send(contacts);
    //     });
    //     }
    // }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        User.find({_id: new ObjectID(userId)}, (error: any, docs: any) => {
            if (error) {
                res.send(error);
                return;
            }
            if (docs[0].role === 0) {
                console.log('admin getting contacts');
                Contact.find({}, (error: any, contacts: any) => {
                    if(error) {
                        res.send(error)
                        return
                    }
                    console.log('admin sent contacts')
                    res.send(contacts)
                })
            }
            else {
                console.log('not an admin');
                Contact.find({userId: new ObjectID(userId)}, (error: any, contacts: any) => {
                    if (error) {
                        res.send(error)
                        return
                    }
                    console.log('setting contacts')
                    res.send(contacts)
                })
            }
        })        
    }

    @Get("/:id")
    public getById(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        
        Contact.find({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any, docs: any) => {
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
        new Contact(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(response.userId, req, {type: DATA_CONTACTS_ADD, payload: {contact: response}});
                this.handleAdminRt(req, {type: DATA_CONTACTS_ADD, payload: {contact: response}});
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Contact.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                console.log(response.userId);
                this.handleRt(response.userId, req, {type: DATA_CONTACTS_UPDATE, payload: {_id: response._id, contact: req.body}});
                this.handleAdminRt(req, {type: DATA_CONTACTS_ADD, payload: {contact: response}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Contact.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
            this.handleRt(userId, req, {type: DATA_CONTACTS_REMOVE, payload: {_id: req.params.id}});
            this.handleAdminRt(req, {type: DATA_CONTACTS_REMOVE, payload: {_id: req.params.id}});
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

    private handleAdminRt(req: Request, action: {type: string, payload: any}): void {
        User.find({role: 0}, (error: any, docs: any) => {
            if (error) {
                console.log('no admins');
                return;
            }
            else {
                console.log('administrators', docs);
                docs.forEach((user: any) => {
                    console.log('checking', user.firstName)
                    if(!clientIdsMap[user._id]) {
                        console.log(user.firstName, ' is offline');
                    }
                    else {
                        console.log(user.firstName, ' is online!');
                        clientIdsMap[user._id]
                            .filter((clientInfo: {clientId: string, jwtToken: string}) => {
                                return clientInfo.jwtToken !== getToken(req);
                            })
                            .forEach((clientInfo: {clientId: string, jwtToken: string}) => {
                                console.log('updating for ', user.firstName);
                                io.to('/#' + clientInfo.clientId).emit("UPDATE_REDUX", action);
                            });
                    }
                })

            }

        })


    }
}

