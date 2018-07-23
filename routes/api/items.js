const express = require("express");
const router = express.Router();

//  @route  GET api/items/test
//  @desc   Test items route
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Items Works" }));

module.exports = router;
