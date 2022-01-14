const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.listen(process.env.PORT || 3000,function(){
  console.log("server running");
});


app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){

var city= req.body.city;

var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ae111c23eb62da370e741aa798c4b7bc&units=metric"
https.get(url,function(response){
  response.on("data",function(data){
    const weatherdetails=JSON.parse(data);
    a1="<h1>Weather in "+city+" is:       "+weatherdetails.main.temp+" degree celsius</h1>"
    // res.write("<h1>Weather in "+city+" is:       "+weatherdetails.main.temp+" degree celsius</h1>")
    a2="<h3>weather condition :"+weatherdetails.weather[0].description+"</h3>"
    // res.write("<h3>weather condition :"+weatherdetails.weather[0].description+"</h3>")
    a3="<img src='http://openweathermap.org/img/wn/"+weatherdetails.weather[0].icon+"@2x.png'>"
    // res.write("<img src='http://openweathermap.org/img/wn/"+weatherdetails.weather[0].icon+"@2x.png'>")
    res.send(a1+a2+a3)
  })
})

})
