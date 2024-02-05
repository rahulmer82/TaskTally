const connectToMongo = require('./databas');
const express = require('express')
var cors = require('cors') 
require("dotenv").config();

connectToMongo();
const corsOptions = {
  origin: "http://localhost:3000" // frontend URI (ReactJS)
}
const app = express()
const port = process.env.PORT || 5000

app.use(cors(corsOptions))
app.use(express.json())

// Available Routes
app.use('/api/data', require('./Routes/data'))
app.use('/api/auth', require('./Routes/Authdata'))
app.use('/api/mt', require('./Routes/Tripdata'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
