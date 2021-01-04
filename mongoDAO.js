//connection strinh
const MongoClient = require('mongodb').MongoClient;

//where too connect
const url = 'mongodb://localhost:27017'

//variables and constants for mongoDB connection
const dbName = 'headsOfStateDB'
const collName = 'headsOfState'

var headsOfStateDB
var headsOfState

//connect too mongo database
MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
.then((client)=>{
    headsOfStateDB = client.db(dbName)
    headsOfState = headsOfStateDB.collection(collName)
})
.catch((error) =>{

})

//gets HeadsOfState
var getHeadsOfState = function(){
    return new Promise((resolve,reject)=>{
       var cursor = headsOfState.find()
       cursor.toArray()
            .then((documents)=>{
                resolve(documents)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}

//add head of state
var addHeadOfState = function(_id, headOfState){
    return new Promise((resolve, reject)=>{
        headsOfState.insertOne({"_id":_id, "headOfState":headOfState})
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

module.exports = {getHeadsOfState,addHeadOfState}