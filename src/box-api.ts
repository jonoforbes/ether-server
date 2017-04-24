let BoxSDK: any = require('box-node-sdk');


var BOX_CLIENT_ID: string = process.env.BOX_CLIENT_ID;
var BOX_CLIENT_SECRET: string = process.env.BOX_CLIENT_SECRET;
var BOX_PUBLIC_KEY_ID: string = process.env.BOX_PUBLIC_KEY_ID;
var BOX_PRIVATE_KEY: string = process.env.BOX_PRIVATE_KEY;
var BOX_PRIVATE_KEY_PASSPHRASE: string = process.env.BOX_PRIVATE_KEY_PASSPHRASE;
var BOX_ENTERPRISE_ID: string = process.env.BOX_ENTERPRISE_ID;


let sdk = new BoxSDK({
		clientID: BOX_CLIENT_ID,
		clientSecret: BOX_CLIENT_SECRET,
		appAuth: {
			keyID: BOX_PUBLIC_KEY_ID,
			privateKey: BOX_PRIVATE_KEY,
			passphrase: BOX_PRIVATE_KEY_PASSPHRASE
		}
	});

export var boxAdminAPIClient = sdk.getAppAuthClient('enterprise', BOX_ENTERPRISE_ID);

export function getBoxUserAPIClient(boxUserId: string) {
    var boxUserAPIClient = sdk.getAppAuthClient('user', boxUserId);
    return boxUserAPIClient;
}