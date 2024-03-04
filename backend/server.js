const express = require("express");
const cors = require("cors");
const adminRouter = require("./src/routes/adminRoute");
const { default: mongoose } = require("mongoose");
const employeeRouter = require("./src/routes/employeeRouter");
const app = express();

mongoose
  .connect(
    "mongodb+srv://harshin:123@recipes.0gu8qp4.mongodb.net/Dealsdray?retryWrites=true&w=majority&appName=recipes"
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("error:", error);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use("/employee", employeeRouter);


app.listen(8080, () => {
  console.log("SERVER STARTED");
});
