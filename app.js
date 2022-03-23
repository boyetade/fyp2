const express = require('express'), 
app = express()

app.use(express.static("public"))

app.set("view engine", "ejs")

app.get('/', (req, res)=> {
   res.send('hi')
})


app.listen(3000, ()=> {
    console.log (`Listening on Port 3000`)
})