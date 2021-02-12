const express = require('express');
const passport = require('passport');
const rp = require('request-promise');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

/* GET CRM Widget. */
router.get('/', ensureLoggedIn, function (req, res, next) {
  res.render('crm', {
    user: req.user
  });
});

/* POST Lead Data after getting request with lead data in the URL params */
router.get('/send', ensureLoggedIn, function (req, res, next) {
  var leadParams = req.query;
  leadPost(req, res, leadParams);
});



function leadPost(req, res, data) {


  var bodyToSend = {
    "firstName": data.fName,
    "lastName": data.lName,
    "email": data.email,
    "mobile": data.phone,
    "vehicleCode": data.atidcapid,
    "range": data.trim,
    "version": data.description,
    "price": data.price,
    "postcode": data.postcode,
    "leadType": data.leadType,
    "activityType": data.carType,
    "misc": {
      "comment": data.addInfo
    },
    "location_id": data.dealershipId,
    "customerVehicle": {
      "regNo": data.customerRegNumber,
      "valuation": data.valuation,
      "mileage": data.mileage
    },
    "vrm":data.usedRegNumber,
    "make": data.brand.toLowerCase().indexOf('select') < 0 ? data.brand : data.usedBrand,
    "model": data.model.toLowerCase().indexOf('select') < 0 ? data.model : data.usedModel,
    "fuelType": data.fuel
  }

  if(bodyToSend.email.length < 4){
  delete bodyToSend.email; 
  } // Remove email key if it wasn't sent

  var options = {
    method: 'post',
    uri: 'https://api-preprod.robinsandday.co.uk/api/liveperson/lead',
    headers: {
      'accept': 'application/json',
      'X-RD-API-Key': process.env.X_API,
      'content-type': 'application/json',
    },
    body: bodyToSend,
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (resp) {
      console.log("Success lead")
      console.log(bodyToSend)
      console.log(resp)
      res.render('leadSent');
      // res.status(200).render('user');
      //  res.status(200).json(resp);

    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: err })
    });
}


module.exports = router;
