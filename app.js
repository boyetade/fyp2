const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const User = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const port = process.env.PORT || 3000
// app.get('/', (req, res)=> {
//    res.send('hi')
// });
app.use(bodyParser.json())

app.listen(port, ()=> {
        console.log (`Listening on Port ${port}`)
        })

// const connectionParams = {
//     useNewUrlParser:true, 
//     useUnifiedTopology:true,
// };
const JWT_SECRET = 'sdjkfh8923yhgfygbhbhu988ihjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose
  .connect("mongodb+srv://admin:focus@cluster0.l3gat.mongodb.net/FocusMe?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  

app.use(express.static("public"))

app.post('/api/login', async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.email
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid email/password' })
})


app.post('/api/register', async (req, res) => {
// console.log(req.body)
const { firstName,lastName,email, password: plainTextPassword } = req.body

if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
}

if (plainTextPassword.length < 5) {
        return res.json({
                status: 'error',
                error: 'Password too small. Should be atleast 6 characters'
        })
}
const password = await bcrypt.hash(plainTextPassword, 10)
try {
       const response = await User.create({
               firstName, 
               lastName,
               email,
               password
       })
       console.log("User Created: ", response)
} catch (error) {
        if (error.code === 11000) {
                // duplicate key
                return res.json({ status: 'error', error: 'Email already in use' })
}
throw error
}
res.json({status:'ok'})
})
