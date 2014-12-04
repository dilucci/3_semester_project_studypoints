var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var http = require('http');
http.post = require('http-post');





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


















  //  var authString = JSON.stringify(req.body)
  //  var headers = {
  //      'Content-Type': 'application/json',
  //      'Content-Length': authString.length
  //  };
  //  var options = {
  //      host: 'http://gruppe4.cloudapp.net',
  //      path: '/authenticate',
  //      method: 'POST',
  //      headers: headers
  //  };
  //  var req = http.request(options, function(res) {
  //      var responseString = '';
  //
  //      res.on('data', function(data) {
  //          responseString += data;
  //      });
  //
  //      res.on('end', function() {
  //          var resultObject = JSON.parse(responseString);
  //          console.log("result: " + resultObject)
  //      });
  //  });
  //
  //  req.on('error', function(e) {
  //      // TODO: handle error.
  //  });
  //
  //  req.write(userString);
  //  req.end();


    //http({
    //    method: 'POST',
    //    url: 'http://gruppe4.cloudapp.net/authenticate',
    //    data: req.body
    //}).success(function(userData){
    //    console.log(userData);
    //    console.log("id: " + userData[0]);
    //    console.log("username: " + userData[1]);
    //    console.log("role: " + userData[2]);
    //    var profile = {
    //        username: userData[1],
    //        role: userData[2],
    //        id: userData[0]
    //    };
    //    console.log('DATA FROM JAVA-DB: ' + userData);
    //    var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, { expiresInMinutes: 60*5 });
    //    res.json({ token: token });
    //})
    // .error(function (data, status, headers, config) {
    //        res.status(401).send('You failed to login. Invalid User or Password');
    //    });;
  //if is invalid, return 401
  // if (req.body.username === profile.username && req.body.password === profile.pw) {
//   if (req.body.username === 'student' && req.body.password === 'test') {
//
//
//    var profile = {
//      username: 'Bo the Student',
//        role: "user",
//        id: 1000
//    };
//    // We are sending the profile inside the token
//    var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, { expiresInMinutes: 60*5 });
//    res.json({ token: token });
//    return;
//  }
//
//  if (req.body.username === 'teacher' && req.body.password === 'test') {
//    var profile = {
//      username: 'Peter the Teacher',
//      role: "admin",
//      id: 123423
//    };
//    // We are sending the profile inside the token
//    var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
//    res.json({ token: token });
//    return;
//  }
//
//  else{
//    res.status(401).send('Wrong user or password');
//    return;
//  }
//});


//Get Partials made as Views
router.get('/partials/:partialName', function(req, res) {
  var name = req.params.partialName;
  res.render('partials/' + name);
});

module.exports = router;
