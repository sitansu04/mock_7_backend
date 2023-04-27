const express = require("express");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.routes.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "Welcome To Mock_7 Backend" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connected to port 8000 and DB");
  } catch (error) {
    console.log(error);
  }
});
