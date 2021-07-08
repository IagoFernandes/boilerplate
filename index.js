const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 3004;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/recuperarRegistro', async function (req, res) {
  
});

app.listen(port, () => console.log(`API server running on port ${port}`));