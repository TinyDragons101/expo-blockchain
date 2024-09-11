const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4001

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server running on port: " + PORT);
    }
    else {
        console.log("Error: " + error);
    }
});

app.post("/helo", (req, res, next) => {
    res.send("hello");
});