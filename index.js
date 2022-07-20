// Require statements
// Create an express application
const zenExpress = require("express")();
(JWT = require("jsonwebtoken")),
  (bcrypt = require("bcryptjs")),
  (bodyParser = require("body-parser")),
  (cookieParser = require("cookie-parser")),
  (db = require("./db.js"));
var globalUserId;
const middlewares = require("./middlewares/auth");
// var loggedIn = false;

var http = require("http").Server(zenExpress);
var io = require("socket.io")(http);
const saltRounds = 10;
const URI = "mongodb://localhost:27017/zen-connect";
const secret = "LetsZenConnect123$";
// const zendb = "zen-connect";

// const bodyParser = require("body-parser");
// JSON to parse the application/json body types
const { json, urlencoded, static } = require("express");
const { ObjectId } = require("mongodb");
const passport = require("passport");
const { User } = require("./db.js");

// Set default view engine to PUG
zenExpress.set("view engine", "pug");

// Set assets folder as static resource
zenExpress.use(static("assets"));

// Use json() to parse body
zenExpress.use(json());

// Use urlencoded() to parse form body
zenExpress.use(bodyParser.urlencoded({ extended: false }));
zenExpress.use(bodyParser.json());
zenExpress.use(cookieParser());

function auth(req, res, next) {
  console.log(req.cookies);
  let token = req.cookies.jwt;
  try {
    console.log(JWT.decode(token));
    const decoded = JWT.verify(token, secret);
    req.user = decoded.user;
    console.log(decoded.user);
    next();
  } catch (e) {
    console.error(e);
    res.status(200).render("components/expired");
  }
}

function getUser() {
  const token = req.cookies.jwt;
  console.log(`token is: ${token}`);
  const decodedToken = JWT.decode(token);
  console.log(`token decoded: ${decodedToken}`);
  const userId = decodedToken.user._id;
  return userId;
}

// The status route
zenExpress.get("/status", function (req, res) {
  res.status(200).send({
    status:
      "The code docked at the port 'localhost@1234' and is set to sail.. ",
  });
});

zenExpress.get("/", function (req, res) {
  try {
    res.status(200).render("home");
  } catch (err) {
    res.status(200).render("home", { error: err });
  }
});

zenExpress.get("/auth/login", function (req, res) {
  try {
    if (loggedIn) {
      res.redirect("/dashboard");
    } else {
      res.status(200).render("auth/login");
    }
  } catch (err) {
    res.status(200).render("auth/login", { error: err });
  }
});

zenExpress.get("/people", async (req, res) => {
  try {
    var allPeople = true;
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    const users = await db.User.find({});
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log("global id is:", userId);
    console.log("user id is: ", user._id);
    // console.log("lol is", user);
    console.log(users);
    res.status(200).render("components/people", { users, user, allPeople });
  } catch (err) {
    res.status(200).render("components/people", { error: err });
  }
});

zenExpress.get("/my-people", async (req, res) => {
  try {
    var allPeople = true;
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    const users = await db.User.find({});
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log("global id is:", userId);
    console.log("user id is: ", user._id);
    // console.log("lol is", user);
    console.log(users);
    res.status(200).render("components/mypeople", { users, user, allPeople });
  } catch (err) {
    res.status(200).render("components/mypeople", { error: err });
  }
});

zenExpress.get("/requests", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    const users = await db.User.find({});
    const user = await db.User.findOne({
      _id: userId,
    });
    var requests = [];
    console.log(user.requestsRecieved);
    console.log("global id is:", userId);
    console.log("user id is: ", user._id);
    user.requestsRecieved.map((request) => {
      console.log(request);
      if (request.recievedFrom == user.username) {
        console.log(request);
        requests.push(request);
      }
    });
    console.log(`requests is: ${requests}`);
    // console.log("lol is", user);
    console.log(users);
    res.status(200).render("components/requests", { users, user, requests });
  } catch (err) {
    res.status(200).render("components/requests", { error: err });
  }
});

zenExpress.get("/auth/register", function (req, res) {
  try {
    res.status(200).render("auth/register");
  } catch (err) {
    res.status(200).render("auth/register", { error: err });
  }
});

zenExpress.get("/dashboard", auth, async (req, res) => {
  try {
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    const user = await db.User.findOne({
      _id: userId,
    });
    const posts = await db.Post.find({});
    console.log("lol is", user);
    // res.status(200).render("components/dashboard", { globalUserId, user });
    res.status(200).render("components/dashboard", { user, posts });
  } catch (err) {
    res.status(200).render("components/dashboard", { error: err });
  }
});

zenExpress.get("/profile", auth, async (req, res) => {
  try {
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    const user = await db.User.findOne({
      _id: userId,
    });
    res.status(200).render("components/profile", { user });
  } catch (err) {
    res.status(200).render("components/profile", { error: err });
  }
});

zenExpress.post("/auth/register", async (req, res) => {
  console.log(req.body);
  try {
    const form_uname = req.body.username;
    const form_pass = req.body.password;
    const user = await db.User.findOne({ username: form_uname });
    if (!user) {
      if (form_uname && form_pass) {
        const cryptedPass = await bcrypt.hash(form_pass, saltRounds);
        // payloadUser = new db.User({
        //   username: form_uname,
        //   password: cryptedPass,
        //   isLoggedIn: false,
        // });
        const insertUcryptPass = await db.User.create({
          username: form_uname,
          password: cryptedPass,
          isLoggedIn: false,
          followInfo: [],
        });
        // const payload = {
        //   user: {
        //     id: user._id,
        //   },
        // };
        // JWT.sign(
        //   payload,
        //   secret,
        //   {
        //     expiresIn: 10000,
        //   },
        //   (err, token) => {
        //     if (err) throw err;
        //     res.status(200).json({
        //       token,
        //     });
        //   }
        // );
        res.status(200).send(insertUcryptPass);
      } else {
        res.status(302).json({ msg: "Username or Password is empty" });
      }
    } else {
      res.status(301).json({ msg: "Username already exists" });
    }
    // res.status(200).send(insertUcryptPass);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error occured");
  }
});

// zenExpress.post("/auth/register", passport.authenticate(local-signup, { session: false}), (req, res, next) => {
//   console.log(req.body);
//   try {
//     const cryptedPass = await bcrypt.hash(req.body.password, saltRounds);
//     user = new db.User({
//       username: req.body.username,
//       password: cryptedPass,
//       isLoggedIn: false,
//     });
//     const insertUcryptPass = await db.User.create({
//       username: req.body.username,
//       password: cryptedPass,
//       isLoggedIn: false,
//     });
//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };
//     JWT.sign(
//       payload,
//       secret,
//       {
//         expiresIn: 10000,
//       },
//       (err, token) => {
//         if (err) throw err;
//         res.status(200).json({
//           token,
//         });
//       }
//     );
//     // res.status(200).send(insertUcryptPass);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Internal server error occured");
//   }
// });

zenExpress.post("/auth/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await db.User.findOne({
      username: req.body.zenUname,
    });
    console.log(user);
    if (user) {
      const comparedPass = await bcrypt.compare(
        req.body.zenPass,
        user.password
      );
      if (comparedPass) {
        const user = await db.User.findOne({
          username: req.body.zenUname,
        });
        console.log(user.username);

        user.isLoggedIn = true;
        const loggedInUser = await db.User.updateOne(
          { _id: user._id },
          { $set: user }
        );
        const checkLoggedInUser = await db.UserLogged.findOne({
          userOID: user._id,
        });
        if (!checkLoggedInUser) {
          await db.UserLogged.create({
            username: user.username,
            userOID: new ObjectId(user._id),
          });
        }
        const payload = {
          user: {
            _id: user._id,
          },
        };

        console.log(user);
        console.log("changed loggedin: ", user.isLoggedIn);
        // res.status(200).send("Authorisation Successful");
        if (user.isLoggedIn) {
          console.log("Is user logged in: ", user.isLoggedIn);
          globalUserId = user._id;
          gid = user._id;
          // res.render("components/dashboard", { gid, user });
        }
        const token = JWT.sign(
          payload,
          secret,
          {
            expiresIn: "1h",
          }
          // (err, token) => {
          //   console.log(payload);
          //   console.log(token);
          //   // if (err) throw err;
          //   // res.setHeader("Set-Cookie", `jwt=${token}`);
          //   res.cookie("jwt", token, { secure: true, httpOnly: true });
          //   // res.status(200).json({
          //   //   token,
          //   // });
          //   res.send();
          //   console.log(req.cookies);
          //   console.log(JWT.decode(token));
          // }
        );
        res.cookie("jwt", token, { secure: true, httpOnly: true });

        return res.redirect("/dashboard");
        // res.render("components/dashboard", { gid, user });
        // res.header("auth-token", token).json({
        //   error: null,
        //   data: {
        //     token,
        //   },
        // });
      } else {
        console.log("Is user logged in: ", loggedIn);
        res.status(200).send("Wrong username or password");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error occured");
  }
});

zenExpress.post("/auth/logout", async (req, res) => {
  try {
    console.log(globalUserId);
    console.log(req.body.userID);
    const user = await db.User.findOne({
      _id: ObjectId(req.body.userID),
    });
    user.isLoggedIn = false;
    const changeLoginStatus = await db.User.updateOne(
      { _id: user._id },
      { $set: user }
    );
    const loggedUser = await db.UserLogged.deleteOne({
      userOID: req.body.userID,
    });
    res.clearCookie("jwt");
    console.log(loggedUser);
    res.redirect("/auth/login");
  } catch (err) {}
});

zenExpress.get("/get-chat", async (req, res) => {
  try {
    console.log(`----------------------------------->  /get-chat started`);
    // console.log(`req is : ${JSON.stringify(req)}`);
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    // console.log(req.body.uid);
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log(`user is: ${user}`);
    const currentUser = await db.UserLogged.findOne({
      userOID: user._id,
    });
    console.log(`currentUser is: ${currentUser}`);
    const chatters = await db.Chatter.findOne({
      _id: currentUser.currentChat,
    });
    console.log(`chatters is: ${chatters}`);
    const reciever = await db.User.findOne({
      _id: chatters.recieverId,
    });
    console.log(`reciever is: ${reciever}`);
    // if (!chatters1) {
    // const chatters = await db.Chatter.findOne({
    //   globalChatId: reciever.username + "-" + user.username,
    // });
    // console.log(`chatters is: ${chatters}`);
    // }
    // if (!chatters1 && !chatters) {
    //   const chatting = await db.Chatter.create({
    //     globalChatId: user.username + "-" + reciever.username,
    //     senderId: userId,
    //     senderName: user.username,
    //     recieverId: req.body.uid,
    //     recieverName: reciever.username,
    //     messages: [],
    //   });
    // }
    // req.query.chatters.senderName;
    res.render("components/chat", {
      user,
      reciever,
      chatters,
    });
  } catch (err) {}
});

zenExpress.post("/follow", async (req, res) => {
  try {
    console.log("-------------------------------> /follow started");
    const token = req.cookies.jwt;
    const decodedToken = JWT.decode(token);
    const userId = decodedToken.user._id;
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log(`user is: ${user}`);
    const followId = req.body.followId;
    console.log(`followID from body is : ${followId}`);
    const userToBeFollowed = await db.User.findOne({
      _id: followId,
    });
    console.log(`userToBeFollowed Id is: ${followId}`);
    console.log(`userToBeFollowed is: ${userToBeFollowed}`);
    requestSent = {
      sentToId: userToBeFollowed._id,
      sentTo: userToBeFollowed.username,
    };
    requestRecieved = {
      recievedId: user._id,
      recievedFrom: user.username,
    };
    user.requestsSent.push(requestSent);
    userToBeFollowed.requestsRecieved.push(requestRecieved);
    const requestRecievedBy = await db.User.updateOne(
      { _id: userToBeFollowed._id },
      { $set: userToBeFollowed }
    );
    const requestSentBy = await db.User.updateOne(
      { _id: user._id },
      { $set: user }
    );
    res.redirect("/people");
  } catch (err) {}
});

zenExpress.post("/accept-request", async (req, res) => {
  try {
    console.log("-------------------------------> /accept-request started");
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    // console.log(req.body.uid);
    const requestName = req.body.requestName;
    const requestId = req.body.requestId;
    const requestUserId = req.body.requestUserId;
    console.log(`requestUserId is : ${requestUserId}`);
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log(`user is: ${user}`);
    const requestingUser = await db.User.findOne({
      username: requestName,
    });
    console.log(`requestingUser is: ${requestingUser}`);
    const rinfo = requestingUser.followInfo.find((requestingUserInfo) => {
      requestingUserInfo.username = user.username
    });
    console.log(`rinfo is: ${rinfo}`);
    followInfoObj = {
      userId: requestUserId,
      username: requestName,
      isFollower: true,
    };
    user.followers.push(followersObj);
    requestingUser.following.push(followingObj);

    const updateFollowersRequest = await db.User.updateOne(
      { _id: user._id },
      { $set: user }
    );
    const updateFollowingRequest = await db.User.updateOne(
      { _id: requestingUser._id },
      { $set: requestingUser }
    );
    if (updateFollowersRequest) {
      await db.User.updateOne(
        { _id: requestingUser._id },
        { $pull: { requestsSent: { sentTo: user.username } } }
      );
    }
    if (updateFollowingRequest) {
      await db.User.updateOne(
        { _id: user._id },
        { $pull: { requestsRecieved: { _id: requestId } } }
      );
    }
    res.redirect("/requests");
  } catch (err) {}
});

zenExpress.post("/chat", async (req, res) => {
  try {
    console.log("-------------------------------> /chat started");
    console.log(req.body.uid);
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    // console.log(req.body.uid);
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log(`user is: ${user}`);
    const reciever = await db.User.findOne({
      _id: req.body.uid,
    });
    console.log(`reciever is: ${reciever}`);
    const chatters = await db.Chatter.findOne({
      globalChatId: user.username + "-" + reciever.username,
    });
    console.log(`chatters is: ${chatters}`);
    const currentUser = await db.UserLogged.findOne({
      userOID: userId,
    });
    console.log(`currentUser is: ${currentUser}`);
    if (chatters) {
      currentUser.currentChat = chatters._id;
      const currentChatUpdate = await db.UserLogged.updateOne(
        { _id: currentUser._id },
        { $set: currentUser }
      );
    }
    // if (!chatters1) {
    // const chatters = await db.Chatter.findOne({
    //   globalChatId: reciever.username + "-" + user.username,
    // });
    // }
    if (!chatters) {
      const senderChat = await db.Chatter.create({
        globalChatId: user.username + "-" + reciever.username,
        senderId: user._id,
        senderName: user.username,
        recieverId: req.body.uid,
        recieverName: reciever.username,
        messages: [],
      });
      const recieverChat = await db.Chatter.create({
        globalChatId: reciever.username + "-" + user.username,
        senderId: req.body.uid,
        senderName: reciever.username,
        recieverId: user._id,
        recieverName: user.username,
        messages: [],
      });
    }
    console.log(chatters);
    // res.render("components/chat", {
    //   globalUserId,
    //   user,
    //   reciever,
    //   chatters,
    //   chatters1,
    // });
    res.redirect("/get-chat");
  } catch (err) {}
});

zenExpress.post("/chat/post", async (req, res) => {
  try {
    console.log("-------------------------------> /chat/post started");
    // const chatters1 = await db.Chatter.findOne({
    //   globalChatId: user.username + "-" + reciever.username,
    // });
    // if (!chatters1) {
    // const chatters = await db.Chatter.findOne({
    //   globalChatId: reciever.username + "-" + user.username,
    // });
    console.log(req.body);
    const token = req.cookies.jwt;
    // console.log(`token is: ${token}`);
    const decodedToken = JWT.decode(token);
    // console.log(`token decoded: ${decodedToken}`);
    const userId = decodedToken.user._id;
    // console.log(userId);
    // console.log(req.body.uid);
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log(`user is : ${user}`);
    const senderChatters = await db.Chatter.findOne({
      _id: req.body.chatId,
    });
    console.log("senderChatters is:", senderChatters);
    const reciever = await db.User.findOne({
      _id: senderChatters.recieverId,
    });
    console.log(`reciever is: ${reciever}`);
    const recieverChatters = await db.Chatter.findOne({
      globalChatId: reciever.username + "-" + user.username,
    });
    console.log("recieverChatters is:", recieverChatters);
    console.log(req.body.chatMsg);
    // chatters.message.map((msgHolder) => (msgHolder.message = req.body.chatMsg));
    senderMessage = {
      sender: user.username,
      message: req.body.chatMsg,
    };
    senderChatters.messages.push(senderMessage);
    await db.Chatter.updateOne(
      { _id: req.body.chatId },
      { $set: senderChatters }
    );
    recieverChatters.messages.push(senderMessage);
    await db.Chatter.updateOne(
      { _id: recieverChatters._id },
      { $set: recieverChatters }
    );
    io.emit("message");
    // res.render("components/chat", {
    //   user,
    //   reciever,
    //   chatters,
    //   // chatters,
    //   // chatters1,
    // });
    res.redirect("/get-chat");
    // res.redirect("/chat");
  } catch (err) {}
});

zenExpress.post("/send-post", async (req, res) => {
  try {
    console.log("-------------------------------> /send-post started");
    const token = req.cookies.jwt;
    const decodedToken = JWT.decode(token);
    const userId = decodedToken.user._id;
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log(`user is : ${user}`);
    const post = await db.Post.create({
      title: req.body.postTitle,
      description: req.body.postMsg,
      postedBy: user.username,
      likes: [],
      showComments: false,
      comments: [],
    });
    res.redirect("/dashboard");
  } catch (err) {}
});

zenExpress.post("/post-like", async (req, res) => {
  try {
    console.log("-------------------------------> /post-like started");
    const token = req.cookies.jwt;
    const decodedToken = JWT.decode(token);
    const userId = decodedToken.user._id;
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log(`user is : ${user}`);
    console.log(`post id is: ${req.body.postId}`);
    const post = await db.Post.findOne({
      _id: req.body.postId,
    });
    console.log(`post is: ${post}`);
    like = {
      likedBy: user.username,
    };
    post.likes.push(like);
    await db.Post.updateOne({ _id: post._id }, { $set: post });
    res.redirect("/dashboard");
  } catch (error) {}
});

zenExpress.post("/post-set-comment", async (req, res) => {
  try {
    console.log("-------------------------------> /post-set-comment started");
    console.log(`post id is: ${req.body.commentSetId}`);
    const post = await db.Post.findOne({
      _id: req.body.commentSetId,
    });
    console.log(`post is: ${post}`);
    post.showComments == false
      ? (post.showComments = true)
      : (post.showComments = false);
    await db.Post.updateOne({ _id: post._id }, { $set: post });
    res.redirect("/dashboard");
  } catch (error) {}
});

zenExpress.post("/post-comment", async (req, res) => {
  try {
    console.log("-------------------------------> /post-comment started");
    const token = req.cookies.jwt;
    const decodedToken = JWT.decode(token);
    const userId = decodedToken.user._id;
    const user = await db.User.findOne({
      _id: userId,
    });
    console.log(`user is : ${user}`);
    console.log(`post id is: ${req.body.commentPostId}`);
    const post = await db.Post.findOne({
      _id: req.body.commentPostId,
    });
    console.log(`post is: ${post}`);
    (commentPost = {
      commentedBy: user.username,
      comment: req.body.commentPost,
    }),
      post.comments.push(commentPost);
    await db.Post.updateOne({ _id: post._id }, { $set: post });
    res.redirect("/dashboard");
  } catch (error) {}
});

io.on("connection", () => {
  console.log("a user is connected");
});

// Start the express application
// zenExpress.listen(1234, function () {
//   console.log(`Server is running @ http://localhost:1234`);
// });
var server = http.listen(1234, function () {
  console.log(`Server is running @ http://localhost:1234`);
});
