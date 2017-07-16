import { io, clientIdsMap } from "./index";
import { handleAuth, getToken } from "./auth";
import { Res, Req } from "controllers.ts/decorator/Params";
import { Request, Response } from "express";
import { User } from "./schema/UserSchema";
var jwt: any = require("jsonwebtoken");

export function handleRt(userId: string, req: Request, action: {type: string, payload: any}): void {
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
    return;
}

export function handleAdminRt(req: Request, action: {type: string, payload: any}): void {
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