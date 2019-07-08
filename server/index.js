const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;

require('dotenv').config();

app.use(cors())
  .use(bodyParser.json())
  .use(router);

app.listen(port, () => console.log(`Server listening on port ${port}`));
