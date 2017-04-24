import {Request, Response} from "express";

var jwt: any = require("jsonwebtoken");

export function handleAuth(req: Request, res: Response): string {
    let token: string = req.header("Authorization").replace("Bearer ", "");
    let error: string = "error";
    if (!validate(token)) {
        res.status(400).send({error: "UNAUTHORIZED"});
        console.log("NOT AUTHORISED");
        return error;
    }
    return getUserIdFromToken(token);
}
export function getToken(req: Request): string{
    return req.header("Authorization").replace("Bearer ", "");
}
export function getUserIdFromToken(token): string {
    return jwt.decode(token, "secret")._id;
}

export function validate(token): boolean {
    return jwt.verify(token, "secret");
}