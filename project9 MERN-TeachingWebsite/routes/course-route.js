const { populate } = require("../models/user-model");

const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("course route正在接受一個request...");
  next();
});

//獲得系統中的所有課程
router.get("/", async (req, res) => {
  try {
    //.populate 是在mongooseDB中的 querry object (thenable object)
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用課程id尋找課程
router.get(":_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", "email")
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//新增課程
router.post("/", async (req, res) => {
  //驗證數據是否符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isStudent()) {
    return res
      .status(400)
      .send("只有講師能發布新課程。若你已是講師，請使用講師帳號登入");
  }

  let { title, description, price } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send("新課程已保存");
  } catch (e) {
    return res.status(500).send("無法創建課程...");
  }
});

module.exports = router;
