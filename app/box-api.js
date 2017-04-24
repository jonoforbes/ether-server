"use strict";
let BoxSDK = require('box-node-sdk');
var BOX_CLIENT_ID = process.env.BOX_CLIENT_ID;
var BOX_CLIENT_SECRET = process.env.BOX_CLIENT_SECRET;
var BOX_PUBLIC_KEY_ID = process.env.BOX_PUBLIC_KEY_ID;
var BOX_PRIVATE_KEY = process.env.BOX_PRIVATE_KEY;
var BOX_PRIVATE_KEY_PASSPHRASE = "-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIhaDP8clsUQUCAggA\nMBQGCCqGSIb3DQMHBAh2w4ZRpXFt4QSCBMj2WJXzZi8qrYcD0cH20iWDpfcYcWqH\nkagOnn3PJaGDYuNU5+xgzIo65wkQhkb49pl2RmFPYIo57qGbhC2EUyJpXyqzNowi\nVFI0HvBcqi1dJhQpSsRdD8nNFW4Hn80T1gE3rmOL9p6vw7m6NF3XDWVIomsLce34\nOEI1tVKFKPJojWf+arvyaavxSq4Q/trfqtf/SRewZQ9IGbGk6G1I2nkQcT9GIOiv\nQ8oi5K/DfV4hbfKfea7vBeNC/m67jIJDM8Z2MEt4hByvXrPHDSK6zx7Z0/XlMBry\nPN/HrA6lLajik6/8O4kocV9chbjPkws56QW3NIMDCJ5MPP8qr3pTk/ItbnpwDjVK\ntpxv1ja1y2Pp1x9+Uy7toVKRIEZIaR9Kljx+Z9S1yekLf/Tcu653YHeBSwpbMFTT\nCUMsJ6D/B2HAz/oZvVKlxA8YIt/z3rJbO77wHl8qJCbvv87VkpgAkdH8PLg5O1q5\n+95fYzI2yBAFlM6+bZ1LkIvd/MKofqSaMrLWxvNWVU/JxyJeo+snZxl48rugVgbH\n9pcrhamubImO5pp2cCIbIHhJjTn7HDF5BO5+zlWH9Dy7i3J5xii19CWq8jqk8/z8\nq9Wbo7kqNGjISL6k8dZ3GmOi19iv2VnOvrV9oay8jVtlDwiYnOxZKIDXW5LCR5jS\n7NLr8J59xCUnnqJ0jnKH2cSIITznmvkAyul3die7UFy1rjVffX6EPUHuxaz8zvMM\nkr+M659txvUwu9O2usig4a0FnCwYDXAM1EWGocAOyOp39RAqSUcMhYK4/s1WtY7t\nIKfQPJeLAi59MPgMe1xlQ4h4krzv/lBbpDU2WaOkpyh7RtL8SKmcBuU5mhaQIIJH\nS5Hk/O9G20w4cgCZsuX9aC7OJTXCWMKrUqZTxS6+bt6HcAr9n3A1VpkYgi3o+UQf\nZIyBhpo/olelanful9/p2ZhMUEMkJ2R9oIe+glr2K35IZNBMHb5BuoS87HpXUaPG\n7JpUwCdD0Q2K27FM3ytekrAflp/16lmeV8y+bKBvJoZjSV3C1O7R/Dd1qzDPzjj6\n52QmI4vdI7jvndq5py4fCq77LQf1Xn9ONH6Cu7PdbGnCcV3Tjzo18HUrEqGCBHN+\n0kAjV+irN3oLrghQxw0vpu8+LDDcft/6Olu/55MpMoYXGFk/WLkTS+hhsjPhcPgu\n0EBzGh67WJbom9OOGqJ3Lu6R0yWKNVvEoLmbegnFTbqDpVXI5qalJrS09A4LouyK\n+j8v6Ix/maPSQKnmhew5W1CwDUTndv4CJ1PJs6gnBlTMpkpTX8ej6s0/nWEC2B5e\nokeKUogWCu8VV4BN5jJUEZoPbWME6YnIT1ufVsMYZr69QeWAD9jRaIDnKZsHRurB\nnNqlNLDCefL/20b4/4Is2eBmugrrLdBZK/5zr4951T7dyyuBIve0UqlUhJqDIo8S\nA3u8kUDJkK/uM6agsQmdscuvG1khDoJ6+P21EFUcSO5mLjYuguHXPbXt9z6ZReOV\nt3lbYFEoJKzf1+Ix6yX7T7KPN+rHmS0e1yE6s4LU5LebR6aKEwOvpcLMep96svt/\npAu0ICf722ougLTs9NFIhOs3sfDEBljTz7Bt0HUja1fhWXDAogm0lWfas4wXHSjy\nGMQ=\n-----END ENCRYPTED PRIVATE KEY-----\n";
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