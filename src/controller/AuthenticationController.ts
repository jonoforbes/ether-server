import {JsonController} from "controllers.ts/decorator/Controllers"
import {Post} from "controllers.ts/decorator/Methods"
import {Res, Req} from "controllers.ts/decorator/Params";
import {Request, Response} from "express";
import {User, IUserModel} from "../schema/UserSchema";
import {UserData} from "../schema/UserDataSchema";
import { ObjectID } from "mongodb";
import {UserDataController} from "./UserDataController";
import * as bcrypt from "bcrypt";
import { boxAdminAPIClient } from "../box-api";
var jwt: any = require("jsonwebtoken");
const SECRET: string = process.env.ETHER_APP_SECRET;


@JsonController("/api/authentication")
export class AuthenticationController {
    constructor() {

    }

    @Post("/register")
    public register(@Req()req: Request, @Res() res: Response): void {
        // console.log(req.body);
        var userId: string = '';
        var boxUserId: string = '';
        var userData: Object = req.body;
        var boxRequestParams = {
            body: {
                name: req.body.login,
                is_platform_access_only: true
            }
        };
        boxAdminAPIClient.post('/users', boxRequestParams, boxAdminAPIClient.defaultResponseHandler(function(err, data) {
                if (err) {
			        console.log(err);
                };
			    boxUserId = data.id;
                req.body.boxUserId = boxUserId;
                // console.log(boxUserId);
                new User(req.body).save((error: any, user: IUserModel) => {
                    if (error) {
                        console.log(error);
                        res.status(500).send({error: "something has gone horribly wrong"});
                        return;
                    }
                    let token: string = jwt.sign({
                        fistName: req.body.firstName,
                        lastName: req.body.lastName,
                        login: req.body.login,
                        _id: user._id
                    }, SECRET);
                    userData["userId"] = user._id;
            
                    res.send({
                        token: token, 
                        login: req.body.login, 
                        firstName: req.body.firstName, 
                        lastName: req.body.lastName,
                        userId: user._id,
                        role: user.role
                    });
                    new UserData(userData).save();
                });
		    } 
        ));
        
        
    }

    @Post("/login")
    public login(@Req()req: Request, @Res() res: Response): void {
        User.find({login: req.body.login}, (err: any, resp: Array<IUserModel>) => {
            if (err) {
                res.status(500).send({error: "something has gone horribly wrong"});
                return;
            }
            if (resp.length === 0) {
                res.status(404).send({error: "User not found"});
                return;
            }
            let user: IUserModel = resp[0];
            // console.log('user', user);
            // console.log('req password', req.body.password);
            // console.log('user password', user.password);
            bcrypt.compare(req.body.password, user.password, (errC: any, isMatch: boolean) => {
                if (!isMatch) {
                    res.status(400).send({error: "Wrong Username/password combination"});
                    return;
                }
                let token: string = jwt.sign({
                    fistName: user.firstName,
                    lastName: user.lastName,
                    login: user.login,
                    _id: user._id
                }, SECRET);
                let boxAccessToken: string = "";
                boxAdminAPIClient._session.tokenManager.getTokensJWTGrant('user', user.boxUserId, function (err, accesstokenInfo) {

                    boxAccessToken = accesstokenInfo.accessToken;
                //     console.log('box access token', boxAccessToken);
                // console.log('box user id', user.boxUserId);
                res.send({
                    token: token, 
                    login: user.login, 
                    firstName: user.firstName, 
                    lastName: user.lastName, 
                    boxUserId: user.boxUserId, 
                    boxAccessToken: boxAccessToken,
                    userId: user._id,
                    role: user.role
                    });
                });
                
            });
        });
    }
}

export function isAdmin(userId: string): Boolean {
    var user: IUserModel;
    User.find({_id: userId}, (err: any, resp: Array<IUserModel>) => {
        if (err) {
            console.log('isAdmin error');
            return;
        }
        if (resp.length === 0) {
            console.log('isAdmin not found');
            return;
        }
        else {
            user = resp[0];
            console.log('found User', user);
        }     
    });
    return false;

}