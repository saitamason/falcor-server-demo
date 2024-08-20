const falcorExpress = require("falcor-express");
const Router = require("falcor-router");
const express = require("express");
const fs = require("fs");
const app = express();

var colorsData = JSON.parse(
  fs.readFileSync(__dirname + "/colors.json", "utf8")
);

app.use(
  "/model.json",
  falcorExpress.dataSourceRoute(function (req, res) {
    // create a Virtual JSON resource with single key ("greeting")
    return new Router([
      {
        // match a request for the key "greeting"
        route: "greeting",
        // respond with a PathValue with the value of "Hello World."
        get: function () {
          return { path: ["greeting"], value: "Hello World" };
        },
      },
      {
        route: "colors",
        get: function () {
          return { path: ["colors"], value: colorsData.colors };
        },
      },
    ]);
  })
);

// serve static files from current directory
app.use(express.static(__dirname + "/"));

app.listen(3000);

console.log("Server listening on port 3000");
