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
router.get('/send', ensureLoggedIn, function(req, res, next) {
  var id = req.query; // $_GET["id"]
  console.log('Lead Submitted with the following details: ' + JSON.stringify(id));
  res.json(leadPost(req,res,id));
});



function leadPost(req, res,data) {
  var options = {
    method:'post',
    uri: 'https://api-preprod.robinsandday.co.uk/api/v1/lead',
    headers:{
      'accept': 'application/json',
      'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU0NGZmZTI3Yjc2NjhkNzg2NGMzMWMwMWI1NDMwNWY5MjRiNTMzZTY2YWYxZDY0MDRiMTg4NjE5ZWJlMmUxYzE4MDYwZDIxNzZlNmJiZDJjIn0.eyJhdWQiOiIyIiwianRpIjoiZTQ0ZmZlMjdiNzY2OGQ3ODY0YzMxYzAxYjU0MzA1ZjkyNGI1MzNlNjZhZjFkNjQwNGIxODg2MTllYmUyZTFjMTgwNjBkMjE3NmU2YmJkMmMiLCJpYXQiOjE2MTIxODM5MDUsIm5iZiI6MTYxMjE4MzkwNSwiZXhwIjoxNjQzNzE5OTA1LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.bllmfo8dt7FO9HNsVGptj5zm4k3Fx_Uk-cR1IVO0TxmoGvBzB7SDHr5PWYoJEU6b_3MSDOTPsMgEgqN3d2URuY6Alfyh8f4K6Q18awnXRK4p7CZrUb9yJK3fj9nWkwYytGyl76UJKN2fKUjd8KVltoHHM6-KzQl0pMvoyoditUbLiYFoNLcQd_tzz5BvrNoy1IdbmiqXaDvinsii00TsgTaq_fckaNVWwkoTp3qDb_YVYs1ZW6XK-mVvmKSD96_8Zu2W4haV2f3qfLR5OrvCfYQeZWnJ5XRW7aIMzPmxnffpgXBTJnYlIXE8UxVpF1P0Bfwtw2VZSgnmd3Cj-rkOyXIBKguU92JumcNjRx2gEaIQtGdxEwlcmZuFGCX2jSnChtNATfqnn6QDx9A-VdokxorPcd6TTK5XreorjMDnto40nbqYeBKdpw7NtMdzA4dWOmmwcWTGuwNNytBHFRb9FFAbOxMxHn3cOFFjdKHICC-gnV3T_o4AL8UpboM1H-PGFkwiO5a9VIG9exLYV6Blg6YfeMYufkLSH1Ye9dwoKOmfMIP7oqO1XAo00XCiaqMst7Yrzl_6eya2cWPkXV_3HHAD3zoLnptwX58RC7Bp7eqzbHD5nvkcWIHiVpCCDf6vOGzXAbVVAKVhSVGVtUBUi-4blyuFe4WwQNXOiubJMjU',
      'content-type': 'application/json',
    },
    body:{
      "firstName": data.fName,
      "lastName": data.lName,
      "email": data.email,
      "misc": {
          "comment": data.addInfo
      },
      "location_id": "34",
      "customer_vehicle": {
          "make": data.brand,
          "model": data.model
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
     // res.status(500).json({ error: err })
    });
}


module.exports = router;
