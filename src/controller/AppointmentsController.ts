import { JsonController } from "controllers.ts/decorator/Controllers";
import { Post, Delete, Put, Get } from "controllers.ts/decorator/Methods";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { Appointment } from "../schema/AppointmentSchema";
import { User } from "../schema/UserSchema";
import { io, clientIdsMap } from "../index";
import { handleAuth, getToken } from "../auth";
var jwt: any = require("jsonwebtoken");

const DATA_APPOINTMENTS_ADD: string = "DATA_APPOINTMENTS_ADD";
const DATA_APPOINTMENTS_REMOVE: string = "DATA_APPOINTMENTS_REMOVE";
const DATA_APPOINTMENTS_UPDATE: string ="DATA_APPOINTMENTS_UPDATE";
const DATA_APPOINTMENTS_ADD_ALL: string ="DATA_APPOINTMENTS_ADD_ALL";

@JsonController("/api/appointments")
export class AppointmentsController {
    constructor() {
    }

    @Get("/")
    public get(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        let queryUserId: string = new ObjectID(userId).toString();
        Appointment.find({ $or:[ {userId: queryUserId}, {invitees: queryUserId} ]}, 
            (error: any, appointments: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('setting appointments');
            res.send(appointments);
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
                Appointment.find({_id: {'$ne': null}}, (error: any, appointments: any) => {
                    if (error) {
                        res.send(error);
                        return;
                    }
                    res.send(appointments);

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
        console.log('_id', queryObjectId);
        Appointment.find(
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
                                {invitees: queryUserId},
                                {_id: queryObjectId}
                            ]
                        }
                    ]    
                }, (error: any, appointments: any) => {
            if (error) {
                res.send(error);
                return;
            }
            console.log('appointments', appointments);
            res.send(appointments[0]);
        });
    }

    @Post("/")
    public post(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        req.body.userId = userId;
        new Appointment(req.body).save((error: any, response: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
                this.handleRt(userId, req, {type: DATA_APPOINTMENTS_ADD, payload: {appointment: response}});
                res.send(response);
            }
            
        });
    }

    @Put("/:id")
    public put(@Req() req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Appointment.findOneAndUpdate({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, req.body, (error: any, response: any) => {
            if (response == null) {
                this.post(req, res);
            }
            else {
                this.handleRt(userId, req, {type: DATA_APPOINTMENTS_UPDATE, payload: {_id: response._id, appointment: req.body}});
                res.send(response);
            }
        });
    }

    @Delete("/:id")
    public delete(@Req()req: Request, @Res() res: Response): void {
        let userId: string = handleAuth(req, res);
        Appointment.remove({_id: new ObjectID(req.params.id), userId: new ObjectID(userId)}, (error: any) => {
            if (error) {
                res.send(error);
                return;
            }
            else {
            this.handleRt(userId, req, {type: DATA_APPOINTMENTS_REMOVE, payload: {_id: req.params.id}});
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

