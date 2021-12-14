const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public'); 
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


// setup handlebars engine and views location and partials location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        Name : 'Akshat'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
       title : 'About',
       Name : 'Akshat' 
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help-Page',
        msg : 'This is where you can search for your queries.',
        Name : 'Akshat'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        });
    }

    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error
            });
        }
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast : forecastData.forecastString,
                location,
                address : req.query.address,
                weatherIcon : forecastData.weatherIcon
            })
        });
    });

});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send('Error');
    }
    console.log(req.query.search);
    res.send({
        products :[]
    });

});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        Name : 'Akshat',
        errorMsg : 'Help Article Not Found!'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        Name : 'Akshat',
        errorMsg : 'Page Not Found!'
    });
});

app.listen(port,()=>{
    console.log("Server is up on port " + port);
});