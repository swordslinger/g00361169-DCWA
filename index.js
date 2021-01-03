//instiates express
var express = require('express')

//imports
var app = express()
var sqlDAO = require("./sqlDAO")
var bodyParser = require('body-parser');
const path =  require('path');

//Sets up view
app.set('view engine', 'ejs')

//configuartion,1st sends build file from server too browser,2nd one sends static file from server too browser
app.use(express.static(path.join(__dirname,'../build')))
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//sends get requests on / ,recieves  links too routing points
app.get('/',(req,res)=>{
    res.send('<a href="http://localhost:3007/listCountries">List Countries</a><p><a href="http://localhost:3007/listCities">List Cities</a></p><p><a href="http://localhost:3007/listHeadsOfState">List HeadsOfState</a></p>');  
})

//displays sql Data for sqlDAO.js
app.get("/listCountries",(req,res)=>{
  sqlDAO.getCountries()
        .then((result)=>{
            res.render("countries",{countries:result})
        })
        .catch((error)=>{
            res.send(error)
        })
    
})

//brings you too add Country
app.get("/addCountries",(req,res)=>{
    res.render("addCountries")

})

//brings you too Update Country
app.get("/updateCountries",(req,res)=>{
    res.render("updateCountries")

})

//Deletes data from updateCountries
app.get("/countries/:co_code",(req,res) =>{
    sqlDAO.deleteCountry(req.params.co_code)
    .then((result)=>{
        if(result.affectedRows == 1)
        {
            res.send(req.params.co_code + "was deleted")
        }
        else if (result.affectedRows == 0)
        {
            res.send()
        }
    })
    .catch((error)=>{
        res.send(req.params.co_code + "Has cities,it cannot be deleted")
    })
})

//gets listCities route and calls sql queary from DAO too display all cities
app.get("/listCities",(req,res)=>{
    sqlDAO.getCities()
    .then((result)=>{
        res.render("listCities",{listCities:result})
    })
    .catch((error)=>{
        res.send(error)
    })
})

app.get("/allDetails/:cty_code",(req,res)=>{
    sqlDAO.getDetails(req.params.cty_code)
        .then((result) => {
            //display individual city
            res.render('allDetails', {listCities:result})
        })
})

app.get("/listHeadsOfState",(req,res)=>{
    res.send('')
})


//r
app.post((req,res)=>{
    sqlDAO.getCountries()
          .then((result)=>{
              res.render("countries",{countries:result})
        
          })
          .catch((e)=>{ console.log(e)
              res.send(e.message)
          })
      
  })

//inserts data from add countries
app.post("/addCountries",(req,res) =>{
    sqlDAO.addCountry(req)
    .then((data)=>{
        res.redirect("/listCountries")
        console.log(data)
    })
    .catch((error)=>{
        res.send(error)
    })
})

//Updates data from updateCountries
app.post("/updateCountries",(req,res) =>{
    sqlDAO.updateCountry(req)
    .then((data)=>{
        res.render("addCountries",{addCountries:data})
        console.log(req.body.co_name)

    })
    .catch((error)=>{
        res.send(error)
    })
})







// set up server on 3007 and  use anonmus function 
app.listen(3007,()=>{
    console.log("Listening on port 3007")
})