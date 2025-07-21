//passport套件使用
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  console.log("序列化Serializ使用者...");
  done(null, user._id); //將mongoDB的id，存在session內部
  //並且將id簽名後，以Cooke的形式給使用者...
});

passport.deserializeUser(async (_id, done) => {
  console.log(
    "Deserialize使用者...使用serializeUser儲存的id，並找到資料庫內的資料"
  );
  let foundUser = await User.findOne({ _id });
  done(null, foundUser); //將req.user這個屬型設定為foundUser
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, //拿ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, //拿Secret
      callbackURL: "/auth/google/redirect", //重新導向
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("進入google strategy的區域");
      // console.log(profile);
      // console.log("==============================");
      let foundUser = await User.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        console.log("使用者已經註冊過，無須存入資料庫");
        done(null, foundUser);
      } else {
        console.log("偵測到新用戶，需要存入到資料庫");
        let newUser = new User({
          name: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        let savedUser = await newUser.save();
        console.log("成功創建新用戶。");
        done(null, savedUser);
      }
    }
  )
);
