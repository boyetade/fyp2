const express = require('express'), 
app = express()
require('dotenv').config()
app.get('/', (req, res)=> {
    res.send('hello')
})


app.listen(3000, ()=> {
    console.log (`Listening on Port 3000`)
})