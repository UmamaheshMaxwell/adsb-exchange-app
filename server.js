const express = require("express")
const cors = require("cors")
const router = require("./routes/adsb.router")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})