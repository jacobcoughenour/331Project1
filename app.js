const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("hello world"));

app.get('/students', (req, res) => {

});

app.post('/students', (req, res) => {

});

app.put('/students', (req, res) => {

});

app.get('/students/:studentId', (req, res) => {

});

app.delete('/students/:studentId', (req, res) => {

});

app.listen(port, () => console.log(`listening on port ${port}`));