const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const rpmRouter = require("./routes/readyplayerme");

app.use(bodyParser.json());

app.use("/", express.static(__dirname));

app.use("/avatar", rpmRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
