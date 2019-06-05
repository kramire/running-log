const express = require('express');
const app = express();
const router = require('./router');

const port = 3001;

app.listen(port, () => console.log(`Server listening on port ${port}`));