const path = require('path');
const express = require('express');
const { appendFile } = require('fs');

app.use(express.static(__dirname + '/dist/small-fields2'))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/small-fields2/index.html'))
})

app.listen(process.env.PORT || 5000);