const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const destinations = require("./routes/destinations")
const reservation = require("./routes/reservation")
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
  console.log("Connected to database")
})

app.use("/api/auth", require("./routes/auth"))
app.use("/reservation" , reservation)
app.use("/destinations", destinations)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
