const mongoose = require('mongoose');

module.exports.connection = async () =>{
    try{
        await mongoose.connect('mongodb+srv://speed:Speed2Akash@cluster0.wcqw1.mongodb.net/hirecoach?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Database Connection successful");
    }catch(error){
        console.log(error);
        throw error;
    }
    
}

module.exports.isValidObjectID = (id) =>{
    return mongoose.Types.ObjectId.isValid(id);
}

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://speed:<password>@cluster0.wcqw1.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });