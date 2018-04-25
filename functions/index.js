const firebase = require("firebase")
const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp({
  credential: admin.credential.cert(functions.config().service_account),
})
firebase.initializeApp(functions.config().config)

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
