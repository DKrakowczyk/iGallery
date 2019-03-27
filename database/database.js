const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
        .then(console.log("Connected to mongoDB..."))
        .catch(()=> {
            console.log("Connection to mongoDB refused...");
        })

mongoose.set("useCreateIndex", true);

module.exports= mongoose;