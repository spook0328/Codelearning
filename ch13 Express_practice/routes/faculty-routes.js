const express = require("express");
const router = express.Router;

router.get("/", (req, res) => {
  res.send("歡迎來到教職員首頁");
});

router.get("/new", (req, res) => {
  return res.send("這是新增教職員的葉面");
});

module.exports = router;
