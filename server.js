const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {

});


app.listen(PORT, function() {
  console.log(`Now listening on port ${PORT} at http://localhost:${PORT}`);
});