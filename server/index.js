const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json())
app.use(router);

app.listen(port, () => console.log(`Server listening on port ${port}`));
