var admin = require("firebase-admin");

var serviceAccount = require("./tehsiti-4421e-firebase-adminsdk-ykj7u-c75c2ce01f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
var timestamp = admin.firestore.Timestamp

module.exports = { db, timestamp };