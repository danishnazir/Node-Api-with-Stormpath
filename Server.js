var express = require('express');
var app = express();
var fs = require("fs");
var stormpath = require('stormpath');
var bodyParser = require('body-parser');


// Put these statements before you define any routes.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var client = new stormpath.Client({
	apiKey: {
    id: '4EX7F5MY6JZ94LWJVRSMREODB',
    secret: '2Qshr8vAu+SA7Uw4+l6Z6HQ83IKhnpxnjZFx2BlyNh4'
  }
});
app.post('/signup', function (req, res) {
client.getApplications({ name: 'My Application' }, function (err, applications) {
  if (err) {
    return console.error(err);
  }

var   application = applications.items[0];
var accountData = {
  username: req.body.username,
  email: req.body.email,
  password: req.body.password
};

application.createAccount(accountData, function (err, account) {
  if (err) {
  res.send(err.userMessage);
  }
else{
  console.log('Hello %s', account.fullName);
res.send({success:true});

}
});

  });
   

});

app.post('/authenticate', function (req, res) {

var applicationHref = 'https://api.stormpath.com/v1/applications/7dGPnemTViMMIKErRiqkrH';

var authRequest = {
  username:req.body.username,
  password:req.body.password 
};

client.getApplication(applicationHref, function (err, application) {
  if (err) {
    return console.error(err);
  }
else
{
  application.authenticateAccount(authRequest, function (err, authResult) {
    if (err) {
      return res.send(err.userMessage);
    }
else
{

    authResult.getAccount(function (err, account) {
      if (err) {
        return console.error(err);
      }
else{
      res.send({account});
  }
    });	//res.send(authResult)
}
  });
}
});



});

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

})