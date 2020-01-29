// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************

// Dependencies
// =============================================================
const express = require("express");
const  cors = require("cors");
const connectHistoryApiFallback = require('connect-history-api-fallback');
// const bodyParser = require('body-parser');
const db = require("./models"); // Requiring our models for syncing to DB

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// include so that it defaults to "/" upon refresh if unknown page
app.use(connectHistoryApiFallback({
  verbose: false
}));

// static files and folders must be set after connectHistoryApiFallback
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Static directory
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// Routes
// =============================================================
require("./routes/api-store-routes.js")(app);
require("./routes/api-inventory-routes.js")(app);
require("./routes/api-product-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
