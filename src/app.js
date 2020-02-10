const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express() 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars(hbs) engine and views location
app.set('view engine','hbs') // used to express the page dynamically change  // create dynamic templates
app.set("views",viewsPath) // used to tell express to ude this path // 1st parameter is setting express, 2nd parameter is path.
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
   res.render('index', {
      title: 'weather app',
      name: 'mubarak'
   })
})

app.get('/about',(req,res) => {
   res.render('about', {
      title:'About me',
      name: 'mubarak'
   })
})

app.get('/help',(req,res) => {
   res.render('help', {
      helpText: 'This is some useful text',
      title: 'help',
      name: 'mubarak'
   })
})

//  for refernce how to render in a webpage from nodejs file
// app.get('',(req, res) => {   // used to print data in webpage
//    res.send('hello express!!')
// })

// app.get('',(req, res) => {   // this is no longer use bcoz index.html occupied a root page which is localhost:3000
//    res.send('<h1>weather</h1>')
// })



// app.get('/help', (req,res) => {
//    res.send([{
//        name:'muabarak'
//    },
// {
//     age:22
//   }
// ])
// })

// app.get('/about',(req,res) => {
//   res.send("About page")
// })



app.get('/weather',(req,res) => {

   if(!req.query.address){
      return res.send({

         error: 'You must provide an address'
      })
   }
   // res.send({
   //    forecast: 'It is snowing',
   //    location: 'philadelphia',
   //    address: req.query.address
   // })
geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
    if(error) {
       return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
         return res.send({error})
      }
      res.send({
         forecast: forecastData,
         location,
         address: req.query.address

      })
    })
})

app.get('/products',(req,res) => {
   if(!req.query.search) {
      return res.send({
         error: 'You must provide just turn'
      })
   }

   console.log(req.query.search)
   res.send({
      products: []
   })
})
})

app.get('/help/*',(req,res) => {
   res.render('404',{
      title: '404',
      name: 'mubarak',
      errorMessage: 'Help article not found'
   })
})

app.get('/abc',(req,res) => {
   res.render('404',{
      title: '505',
      name: 'mubarak',
      errorMessage: 'Help article not found'
   })
})

app.get('*',(req,res) => {
    res.render('404',{
       title:'404',
       name: 'mubarak',
       errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=> {
   console.log('server is an port 3000')
}) // used to start a server