const crypto = require('crypto')
const axios = require('axios')
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

var db = admin.firestore()

exports.alexa = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  console.log(request.body)
  response.json(request.body)
})

exports.nonProfits = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  if (request.method === 'GET') {
    var nonProfitsRef = db.collection('nonProfits')
    var nonProfits = []
    nonProfitsRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        var nonProfit = doc.data()
        nonProfit.id = doc.id
        nonProfits.push(nonProfit)
      })
      response.json(nonProfits)
      return 'success'
    })
    .catch(err => {
      response.json({'error':'please try again', 'details':err})
    })

  } else {
    response.json({'result':'error HTTP method not active', 'message':'you can´t do this yet. But thanks for trying :)'})
  }

})

exports.payments = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')

  var body = {
      "clientReferenceInformation": {
          "code": "TC50171_3"
      },
      "processingInformation": {
          "commerceIndicator": "internet"
      },
      "aggregatorInformation": {
          "subMerchant": {
              "cardAcceptorID": "1234567890",
              "country": "US",
              "phoneNumber": "650-432-0000",
              "address1": "900 Metro Center",
              "postalCode": "94404-2775",
              "locality": "Foster City",
              "name": "Visa Inc",
              "administrativeArea": "CA",
              "region": "PEN",
              "email": "test@cybs.com"
          },
          "name": "V-Internatio",
          "aggregatorID": "123456789"
      },
      "orderInformation": {
          "billTo": {
              "country": "US",
              "lastName": "VDP",
              "address2": "Address 2",
              "address1": "201 S. Division St.",
              "postalCode": "48104-2201",
              "locality": "Anna Arbor",
              "administrativeArea": "MI",
              "firstName": "RTS",
              "phoneNumber": "999999999",
              "district": "MI",
              "buildingNumber": "123",
              "company": "Visa",
              "email": "test@cybs.com"
          },
          "amountDetails": {
              "totalAmount": "104.21",
              "currency": "USD"
          }
      },
      "paymentInformation": {
          "card": {
              "expirationYear": "2031",
              "number": "5555555555554444",
              "securityCode": "123",
              "expirationMonth": "12",
              "type": "002"
          }
      }
    }

  var xPayToken = getXPayToken('v2/payments', 'apikey=9J8SI59QGCK0KODPUTHS21wizipqk3emCHTBBZUb9dMPTbv0E', body)
  console.log('--------------')

  axios({
    method: 'post',
    url: 'https://sandbox.webapi.visa.com/cybersource/v2/payments?apikey=9J8SI59QGCK0KODPUTHS21wizipqk3emCHTBBZUb9dMPTbv0E',
    headers: {
      'content-type': 'application/json',
      'x-pay-token': xPayToken
    },
    data: body
  })
  .then(res => {
    console.log(res.data)
    console.log('a huevo')
    response.json(res.data)
    return true
  }).catch(err => {
    console.log(err)
    response.json(err.data)
  })
})

function getXPayToken(resourcePath , queryParams , postBody) {
  var timestamp = Math.floor(Date.now() / 1000);
  var preHashString = timestamp + resourcePath + queryParams + JSON.stringify(postBody);
  var crypto = require('crypto');
  var hashString = crypto.createHmac('SHA256', 'QFXhGVv8}o2tX65{e}$+OxsABb8lY8fHMYQE{uWY').update(preHashString).digest('hex');
  var xPayToken = 'xv2:' + timestamp + ':' + hashString;
  console.log(xPayToken)
	return xPayToken;
}
