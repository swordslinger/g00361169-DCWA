var mysql = require('promise-mysql')

var pool



//creates pool based on database provided by project spec
mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'geography'
})
  .then((result) => {
    pool = result
  })
  .catch((error) => {
    console.log(error)
  })
//gets  countrys table in sql database
var getCountries = function () {
  //Return new promise
  return new Promise((resolve, reject) => {
    //function promise/queary database
    pool.query("select * from country")
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  }
  )
}
//adds country too sql table
var addCountry = function (req) {
  // returns new promise
  return new Promise((resolve, reject) => {
    // function that inserts row into country table
    var myQuery = {
      sql: "INSERT INTO country VALUES (?, ?, ?)",
      values: [req.body.co_code, req.body.co_name, req.body.co_details]
    }

    pool.query(myQuery)
      .then((data) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })

  })


}
//updates country in country table
var updateCountry = function (req) {
  // returns new promise
  return new Promise((resolve, reject) => {
    // function that updates row in country table
    var myQuery = {
      sql: " UPDATE country SET co_name = ?, co_details = ? WHERE co_code = ?;",
      values: [req.body.co_name, req.body.co_details, req.body.co_code]
    }

    pool.query(myQuery)
      .then((data) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })

  })


}

//Deletes country in conutry table
var deleteCountry = function (co_code) {
  // returns new promise
  return new Promise((resolve, reject) => {
    // queary that deletes from database
    var myQuery = {
      sql: " DELETE from country where co_code = ?",
      values: [co_code]
    }

    pool.query(myQuery)
      .then((result) => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })

  })


}

//gets city table in sql database
var getCities = function () {
  //Return new promise
  return new Promise((resolve, reject) => {
    //function promise/queary database
    pool.query("select * from city;")
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  }
  )
}


//gets details of in sql database
var getDetails = function () {
  //Return new promise
  return new Promise((resolve, reject) => {
    //function promise/queary database
    pool.query("select * from city;")
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  }
  )
}



module.exports = { getCountries, addCountry, updateCountry, deleteCountry,getCities,getDetails }