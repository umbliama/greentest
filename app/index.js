const express = require("express");

const { app, PORT } = require("./bootstrap");
const logger = require("../utils/logger");

const m1Router = require("../src/m1/index");
require("../src/m2/worker");

app.use(express.json());

app.use("/api", m1Router);

app.listen(PORT);

logger.info("App has started!");
