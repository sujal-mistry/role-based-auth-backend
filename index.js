const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const host = "localhost";
const port = 3030;
const cors = require("cors");

//#region Create Server Function
const createServer = async () => {
  //Start
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.json({ info: "API is running on port: " + port });
  });

  const user = require("./routes/user");

  app.use("", user);

  return app;
};

//#region Start Server Function
const startServer = async () => {
  try {
    const app = await createServer();
    app.listen(port, host, () => {
      console.log(`Running on http://${host}:${port}`);
    });
  } catch (error) {
    console.log("Failed to start the server: ", error);
    process.exit();
  }
};

//Start The Server
startServer();
