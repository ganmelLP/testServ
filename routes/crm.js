const express = require('express');
const passport = require('passport');
const rp = require('request-promise');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

/* GET CRM Widget. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('crm', {
    user: req.user
  });
});

/* POST Lead Data after getting request with lead data in the URL params */
router.get('/:info', ensureLoggedIn, function(req, res, next) {
  var leadParams = req.query;
  console.log("Calling get dealerships from CRM route");
  api.getDealerships(req,res);

  console.log('Lead Submitted with the following details: ' + JSON.stringify(leadParams));
  var numberPattern = /\d+/g;
  console.log("ONLY ID OF LOCATION: " +leadParams.dealership.match( numberPattern ))
  res.json(leadPost(req,res,leadParams)).send(leadParams).render('crm');
});



function leadPost(req, res, data) {

  let numberPattern = /\d+/g;
  let locationId = data.dealership.match( numberPattern );
  console.log("Taking only number (id) from the location name: " + locationId);

  var options = {
    method:'post',
    uri: 'https://api-preprod.robinsandday.co.uk/api/liveperson/lead',
    headers:{
      'accept': 'application/json',
      'X-RD-API-Key': process.env.X_API,
      'content-type': 'application/json',
    },
    body:{
      "firstName": data.fName,
      "lastName": data.lName,
      "email": data.email,
      "mobile": data.phone,
      "vehicleCode": data.atidcapid,
      "range": data.trim,
      "version": data.description,
      "price": data.price,
      "postcode": data.postcode,
      "leadType":data.leadType,
      "activityType":data.carType,
      "misc": {
          "comment": data.addInfo
      },
      "location_id": data.dealershipId,
      "customer_vehicle": {
          "make": data.brand.toLowerCase().indexOf('select') > -1 ? data.brand : data.usedBrand,
          "model": data.model.toLowerCase().indexOf('select') > -1 ? data.model : data.usedModel,
          "fuelType": data.fuel,
          "regNo": data.customerRegNumber,
          "valuation": data.valuation,
          "mileage": data.mileage
      }
  },
    json: true // Automatically parses the JSON string in the response
  };
  
  rp(options)
    .then(function (resp) {
       console.log(resp)
       return resp;
        //res.status(200).json(resp);
        
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: err })
    });
}


module.exports = router;
