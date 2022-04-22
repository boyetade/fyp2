const express = require('express'), 
app = express()
const mongoose = require('mongoose')

app.listen(3000, ()=> {
        console.log (`Listening on Port 3000`)
        })

// const connectionParams = {
//     useNewUrlParser:true, 
//     useUnifiedTopology:true,
// };
// mongoose.connect("mongodb+srv://admin:focus@cluster0.l3gat.mongodb.net/FocusMe?retryWrites=true&w=majority")
// .then(()=> {
//     console.log("Connected");
//     
// })
// .catch((err) => {
//     console.log(err)
// })
app.use(express.static("public"))


app.get('/', (req, res)=> {
   res.send('hi')
})




