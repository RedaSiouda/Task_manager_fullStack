// index.js

const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const app = express();
const db = require("./db/dbConnec");
const taskRoute = require("./routes/taskRoute");
const logger = require('./utils/logger');

dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", taskRoute);

// Export the Express app
module.exports = app;

db.connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
