const path=require('path');
const express = require('express'); 
const hbs = require('hbs');          
var app = express();

const port=process.env.PORT || 3000;       
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
	var log=`${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('file.log',log+'\n',(err)=>
	{		if(err)
		{			console.log("Some Problem");	} });
	next();	});

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear() });

hbs.registerHelper('Capt', (text) => {
  return text.toUpperCase();	});
  
app.use(express.static('/views/images'));

app.get('/home', (req, res) => {
  res.render('home.hbs');
});

app.get('/Rooms', (req, res) => {
  res.render('Rooms.hbs');
});

app.get('/contact', (req, res) => {
  res.render('contact.hbs');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
