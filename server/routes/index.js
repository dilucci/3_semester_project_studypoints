var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var http = require('http');






/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
  //TODO: Go and get UserName Password from "somewhere"

//    var authData = JSON.stringify(req.body);
//    console.log("Auth data: " + authData)
//
//    http.post("http://gruppe4.cloudapp.net/authenticate", req.body,
//        function(response) {
//            //response.setEncoding("utf8");
//            response.on("data", function(chunk) {
//                console.log("chunk: " + chunk);
//            });
//        });
//});




    var authData = JSON.stringify(req.body);
    console.log('authdata: ' + authData + " | length: " + authData.length )
    console.log(authData);

    var options = {
        host: 'gruppe4.cloudapp.net',
        path: '/authenticate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': authData.length
        }
    };

    console.log("Options finished." + JSON.stringify(options))
    var token = "";
    var httpreq = http.request(options, function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', function (data) {
            console.log("body: " + data);
            var profileStr = data.substring(1, data.length-1).split("\"");
            console.log("prfStr: " + profileStr);
            var strArray = [profileStr[0], profileStr[1], profileStr[2]];
            console.log("array: " + strArray)
            var profile = {
                        id: profileStr[0].substring(0,1),
                        username: profileStr[1],
                        role: profileStr[3]
                    };
            console.log("profile: " + profile.id)
            console.log("profile: " + profile.username)
            console.log("profile: " + profile.role)
            token = jwt.sign(profile, require("../security/secrets").secretTokenUser, { expiresInMinutes: 60*5 });
            console.log("token: " + token);
        });
        response.on('end', function() {
            res.json({ token: token });
        })
    });
    console.log("Writing data to request...");
    httpreq.write(authData);
    console.log("Finished writing to request");
    httpreq.end();
    console.log("Request ended.")
});


//Get Partials made as Views
router.get('/partials/:partialName', function(req, res) {
  var name = req.params.partialName;
  res.render('partials/' + name);
});

module.exports = router;
