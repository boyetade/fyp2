const express = require('express'), 
app = express()
const mongoose = require('mongoose')


const connectionParams = {
    useNewUrlParser:true, 
    useUnifiedTopology:true,
};
mongoose.connect("mongodb+srv://admin:focus@cluster0.l3gat.mongodb.net/FocusMe?retryWrites=true&w=majority")
.then(()=> {
    console.log("Connected");
    app.listen(3000, ()=> {
        console.log (`Listening on Port 3000`)
    })
})
.catch((err) => {
    console.log(err)
})
app.use(express.static("public"))

app.set("view engine", "ejs")

app.get('/', (req, res)=> {
   res.send('hi')
})
var client_id = 'bac3535f536b4a5c88dfe6d1fa5bcea9'; // Your client id
var client_secret = 'cdbe500d9c164131928d1c9982fa33f0'; // Your secret
var redirect_uri = 'http://localhost:3000/music.html'; // Your redirect uri
var scopes = \'user-read-private user-read-email\'


