const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()

exports.newUser = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(
      {
        verified: true,
      },
      { merge: true }
    )
})

exports.createUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    let { email, name } = snap.data()
    let uid = context.params.userId

    return admin.auth().createUser({
      email,
      emailVerified: true,
      displayName: name,
      uid,
    })
  })
