"use strict";
let BoxSDK = require('box-node-sdk');
var BOX_CLIENT_ID = process.env.BOX_CLIENT_ID;
var BOX_CLIENT_SECRET = process.env.BOX_CLIENT_SECRET;
var BOX_PUBLIC_KEY_ID = process.env.BOX_PUBLIC_KEY_ID;
var BOX_PRIVATE_KEY = process.env.BOX_PRIVATE_KEY;
var BOX_PRIVATE_KEY_PASSPHRASE = process.env.BOX_PRIVATE_KEY_PASSPHRASE;
var BOX_ENTERPRISE_ID = process.env.BOX_ENTERPRISE_ID;
let sdk = new BoxSDK({
    clientID: BOX_CLIENT_ID,
    clientSecret: BOX_CLIENT_SECRET,
    appAuth: {
        keyID: BOX_PUBLIC_KEY_ID,
        privateKey: BOX_PRIVATE_KEY,
        passphrase: BOX_PRIVATE_KEY_PASSPHRASE
    }
});
exports.boxAdminAPIClient = sdk.getAppAuthClient('enterprise', BOX_ENTERPRISE_ID);
function getBoxUserAPIClient(boxUserId) {
    var boxUserAPIClient = sdk.getAppAuthClient('user', boxUserId);
    return boxUserAPIClient;
}
exports.getBoxUserAPIClient = getBoxUserAPIClient;
//# sourceMappingURL=box-api.js.map