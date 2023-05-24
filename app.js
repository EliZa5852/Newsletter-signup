const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { options } = require('jquery-file-upload-middleware');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,

                }

        }
    ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/507f0c4701";


    const options = {
        method:"POST",
        auth:"Eliza1:1ac1ac88ea13d455c113cd322bce44f0-us21"
    }

    const request = https.request(url,options,function(response){
        response.statusCode === 200 ? res.sendFile(__dirname+"/successful.html") : res.sendFile(__dirname+"/failure.html");
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 8000,function(){
    console.log("server started on port 8000");
});

// API Key
//1ac1ac88ea13d455c113cd322bce44f0-us21

//List ID
//507f0c4701