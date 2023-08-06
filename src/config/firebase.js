var admin = require("firebase-admin");

var serviceAccount = require("./tehsiti-2635c-firebase-adminsdk-r4gxj-fb4fb31add.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
var timestamp = admin.firestore.Timestamp

module.exports = { db, timestamp };