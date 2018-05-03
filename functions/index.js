const firebase = require("firebase")
const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp({
  credential: admin.credential.cert(functions.config().service_account),
})
firebase.initializeApp(functions.config().config)

const defaultPeriod = (date = new Date()) => {
  let month = date.getMonth()
  let year = date.getFullYear()

  return {
    year: month === 0 ? year - 1 : year,
    period: month === 0 ? 6 : Math.ceil(month / 2),
  }
}

exports.createTransaction = functions.firestore
  .document("transactions/{transactionID}")
  .onCreate((snap, context) => {
    let period = defaultPeriod()

    return snap.ref.update({
      createdAt: new Date(),
      period: period.year + "-" + period.period,
    })
  })

exports.updateUser = functions.firestore
  .document("users/{userId}")
  .onUpdate((change, context) => {
    let { office, currency, admin: isAdmin } = change.after.data()
    let uid = context.params.userId

    return admin.auth().setCustomUserClaims(uid, {
      admin: isAdmin,
      office,
      currency,
      verified: true,
    })
  })

exports.createUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    let { office, currency, admin: isAdmin, email, name } = snap.data()
    let uid = context.params.userId

    return admin
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
          admin: isAdmin,
          office,
          currency,
          verified: true,
        })
        // send password reset email
        return firebase.auth().sendPasswordResetEmail(email)
      })
  })
