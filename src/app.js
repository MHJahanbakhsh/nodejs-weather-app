const path = require('path');
const express = require('express');
const hbs = require('hbs')
const app = express();
const forcast = require('../utils/forcast')
const geocode = require('../utils/geocode')
//app.com
//app.com/help
//app.com/about

    const directoryToUSe = path.join(__dirname,'../public') //for css and js files
    app.use(express.static(directoryToUSe)) //by defalt makes path to file name


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views')) //we are changing the default path to the new path
hbs.registerPartials(path.join(__dirname, '../templates/partials')) //defining path for partials

app.get('',(req,res)=>{
    res.render('index',{ //we dont write .hbs file extension 
        title: 'Weather',
        name: 'Juan'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        kossher:12,
        name:'unknown'
    })
})
app.get('/about',(req,res)=>{
    res.render('about'
    )
})

app.get('/weather',(req, res) => {
  if(!req.query.address){
      return  res.send({ //return is very important because it ignore rest of the function.otherwise,two res.send will cause an error
        error:'please provide an address' 
    })
  }
  geocode(req.query.address,(geoErr,{location, longtitude, latitude}={})=>{
      if(geoErr){return res.send({geoErr})}
    forcast(`${latitude},${longtitude}` , (forcastErr, forcastRes)=>{
        res.send({location,address:req.query.address,forcast:forcastRes})
        })
  })
   
});
app.get('/help/*',(req,res)=>{
    res.send('Help article not found')
})
app.get('*',(req,res)=>{
    res.send('page is not found')
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


//RUNNING NODEMON IN A WACHMODE FOR HBS FILES (restart server when hbs files changes too):
// nodemon './src/app.js' -e js,hbs

