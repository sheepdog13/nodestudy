const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sheepdog13:abcd1234@cluster0.td5s7g6.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hi"));

app.listen(port, () => console.log(`app lisening on port ${port}`));
