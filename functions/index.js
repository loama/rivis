const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.alexa = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  console.log(request.body);
  response.json(request.body);
})
