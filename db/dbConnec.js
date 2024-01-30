const mongoose = require("mongoose");
const config = require('../utils/logger')

const connectToMongoDB = () =>{

    return new Promise((resolve, reject) =>{
        if(!process.env.MONGO_URI){
            reject("Pls provide a mongoose uri in the .env")
        }


        mongoose.connect(process.env.MONGO_URI)
            .then(() =>{
                console.log('connected to the database')
                resolve()
            })
            .catch((error) =>{
                console.log("bouuuuh pas connecter to the database", error)
                reject(error)
            });
    });
};



module.exports = {
    connectToMongoDB
}