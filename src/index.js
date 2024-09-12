const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require("dotenv").config();

const initWebRouters = require("./routes/router");
const express = require('express')

const app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors({
    origin: 'http://localhost:3000'
}))
// app.use(express.json())

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

initWebRouters(app)

app.get('/', (req, res) => {
    res.json({
        message: "xin chao"
    })
})

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})
