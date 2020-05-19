const mongoose = require('mongoose');

module.exports.connection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Database Connection successful");
    }catch(error){
        console.log(error);
        throw error;
    }
    
}

module.exports.isValidObjectID = (id) =>{
    return mongoose.Types.ObjectId.isValid(id);
}