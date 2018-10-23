const path = require('path');
const express = require('express');

const app = express();
const port = 6500;

const staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.listen(port, function() {
    console.log('listening on port ' + port);
});