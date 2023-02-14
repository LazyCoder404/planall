const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/planall-project').then(()=>{console.log("Connection Successfull...")}).catch((err)=>{console.log(err)});