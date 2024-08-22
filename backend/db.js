const mongoose=require('mongoose');
const mongoURI="mongodb://localhost/inotebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI);
        console.log("connected to mongo successfully");
    
}

module.exports=connectToMongo;