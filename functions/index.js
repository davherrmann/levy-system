const firebase = require("firebase")
const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp({
  credential: admin.credential.cert(functions.config().service_account),
})
firebase.initializeApp(functions.config().config)

exports.login = functions.https.onRequest((req, res) => {
  return admin
    .auth()
    .createCustomToken("wDxQjA2XSs7cUO2uzslS", {
      email: "davherrmann@googlemail.com",
      verified: true,
      office: "UK",
    })
    .then(function(customToken) {
      res.status(200).send(customToken)
    })
    .catch(function(error) {
      console.log("Error creating custom token:", error)
      res.status(400).send("token could not be created")
    })
})

exports.createUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    let { email, name } = snap.data()
    let uid = context.params.userId

    admin
      .auth()
      .createUser({
        email,
        emailVerified: true,
        displayName: name,
        uid,
      })
      .then(user => {
        // set custom user claims
        admin.auth().setCustomUserClaims(uid, {
          verified: true,
        })
        // send password reset email
        return firebase.auth().sendPasswordResetEmail(email)
      })
  })
