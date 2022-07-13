const express = require("express");
const readyController = require("../controllers/readyController");

const router = express.Router();

router.route("/").post(readyController.avatarLink);

module.exports = router;
