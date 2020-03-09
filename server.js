const express = require("express");
const app = express();
app.use(express.static("public"));

app.use("css", express.static(__dirname + "/public/css"));
app.use("js", express.static(__dirname + "/public/js"));

app.get("/", function(req, res) {
  res.redirect("index.html");
});

const server = app.listen(
  (8081,
  function() {
    const port = server.address().port;
    console.log(`Server started at ${port}`);
  })
);