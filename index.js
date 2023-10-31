require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const connectDatabase = require('./src/config/database');
const route = require('./src/routes/route')



app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//swagger documents setup
const swaggerUi = require('swagger-ui-express');
const YAML = require("yamljs");
const swaggerJsdoc = YAML.load("./api.yaml");
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));


// data base connection
connectDatabase();

//route method 
app.use('/book-api', route)



// checking application end point
app.get('/', (req, res) => {
    res.json({ "message": "book_management_system" });
});


const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})