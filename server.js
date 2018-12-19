const express= require('express');
const hbs= require('hbs');
const fs= require('fs');
var app= express();
hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt' ,(text)=>{
  return text.toUpperCase();
})
app.use((req,res, next)=>{
  var now= new Date().toString();
  var log=`${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+ '\n', (err)=>{
    if(err)
    {
      console.log('error occured');
    }
  });
  next();
});
app.use((req, res, next)=>{
  res.render('maintainance.hbs');
});
app.use(express.static( __dirname + '/public'));
app.get('/', (req, res)=>{
//  res.send('<h1>hello express!</h1>');
res.render('home.hbs',{
  pageTitle: 'home page',

  welcome: 'welcome to home page'
})
});
app.get('/about', (req, res)=>
{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });});
app.get('/bad',( req, res)=>{
  res.send({
    errorMessage: 'sorry could not load'
  });
});

app.listen(3000, ()=>{
  console.log('server is up on port 3000');
});
