var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var User = require('../models/User');
var Racquet = require('../models/Racquet');
var cookieParser = require('cookie-parser');


function verifyToken(req, res, next) {
console.log(req.cookies.token);
  // check header or url parameters or post parameters for token
  var token = req.cookies.token;
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
      console.log("TOKEN GIVEN JWT VERIFY: ", token)
      console.log("JWT TOKEN NOT VERIFIED ", err)
      req.user=null;
      next();
    } else {
    // if everything is good, save to request for use in other routes
    let id = decoded.id;
    User.findOne({_id : id},function(err,found){

      if(!found)
      req.user=null
      else {
        Racquet.find({stringer:found}).populate('stringer').exec(function(err,racquets){
          req.user=found;
          req.user.racquets=racquets;
          next();
        })

        console.log("TOKEN FOUND< USER FOUND< : ", req.user)
      }

    })
  }

  });

}

module.exports = verifyToken;
