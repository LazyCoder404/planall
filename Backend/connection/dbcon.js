const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/Project_Planall_demo').then(()=>{console.log("Connection Successfull...")}).catch((err)=>{console.log(err)});