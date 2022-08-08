const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp()


exports.addToAdmin = functions.auth.user().onCreate(user => {
  return admin.auth().setCustomUserClaims(user.uid, { admin: true })
})

exports.addCustomer = functions.auth.user().onCreate(user => { 
  return admin.auth().setCustomUserClaims(user.uid, { admin: true })
})
