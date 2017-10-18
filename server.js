const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// creating an app
const app = express();

// adding advanced templating feature
hbs.registerPartials(__dirname + '/views/partials');

// setting a key-value pair, the key is what i want to set and the value is what i want to use.
app.set('view engine', 'hbs');
// Serving static public directory
app.use( express.static(__dirname + '/public') );

// using express middleware
app.use( (req,res,next)=> {
  const currentTime = new Date().toString();
  const log =`${currentTime}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    };
  })
  next();
} );

// app.use( (req,res,next) => {
//     res.render('maintenance.hbs', {title:'Sorry under maintenance', paragraph:'This page is not ready.' })
// });

hbs.registerHelper('header', () => {
  return 'This is about me';
});

hbs.registerHelper('screamIT', (text) => {
  return text.toUpperCase();
});

// Setting up http route handles
// If user visits website, it will send something back

// http get request
// looking for the root url
// 2nd argument has two important arguments
// req stores info about the incoming req like headers, body, methods, path used
// res is for you to respond to the http request in whatever way you like.
app.get('/', (req , res) => res.render( 'home.hbs' ,{title:'HomePage', paragraph:'Welcome Andrew'}) );

app.get('/bad', (req,res) => res.send({error:'unable to get request'}) )

app.get('/about', (req , res) => {
  res.render('about.hbs', {
    pageTitle: 'OMG dynamic title',
    pageYear: new Date().getFullYear(),
  });
} )

// binding app to the local port of the pc
app.listen(3000, () => console.log('Server is up, running on port 3000') );
