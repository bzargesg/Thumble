const express = require("express");
const routes = require("./routes/routes");

var app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/../dist"));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
