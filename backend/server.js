const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const dataRouter = require("./routes/dataRoutes.js");

const port = 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use("/api/startpage", require("./routes/startpageRoutes"));
// app.get("/", (req, res) => {
//   res.send({ message: "index" });
// });
app.use("/data", dataRouter);
app.listen(port, () => console.log(`Server started on port ${port}`));
