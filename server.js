const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// Create express server
const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Point to server routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Set up DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true
});

// Start server
app.listen(PORT, function() {
  console.log(`Now listening on port ${PORT} at http://localhost:${PORT}`);
});