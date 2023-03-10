require('./connection/dbcon');
const express = require('express')
const app = express()
const upload = require('express-fileupload')
const port = 5555
const WebRouter = require('./router/web')
const ApiRouter = require('./router/api')
const cors = require('cors')
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))

app.use(cors({
    origin:"*",
    methods:["GET","POST","PATCH","DELETE"]
}))
app.use(upload())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(WebRouter)
app.use(ApiRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
