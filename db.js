const mongoose = require("mongoose");

const zendb = "zen-connect";
const URI = `mongodb://localhost:27017/${zendb}`;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isLoggedIn: Boolean,
  followInfo: [
    {
      userId: new mongoose.ObjectId(),
      username: String,
      isBeingFollowed: Boolean,
      isFollower: Boolean,
    },
  ],
  requestsRecieved: [
    {
      recievedId: new mongoose.ObjectId(),
      recievedFrom: String,
    },
  ],
  requestsSent: [
    {
      sentToId: new mongoose.ObjectId(),
      sentTo: String,
    },
  ],
  joined: { type: Date, default: Date.now },
});

var loggedInSchema = new mongoose.Schema({
  username: String,
  userOID: new mongoose.ObjectId(),
  currentChat: new mongoose.ObjectId(),
  joined: { type: Date, default: Date.now },
});

var chatSchema = new mongoose.Schema({
  globalChatId: String,
  senderId: new mongoose.ObjectId(),
  senderName: String,
  recieverId: new mongoose.ObjectId(),
  recieverName: String,
  messages: [
    {
      sender: String,
      message: String,
    },
  ],
});

var postSchema = new mongoose.Schema({
  title: String,
  description: String,
  postedBy: String,
  likes: [
    {
      likedBy: String,
    },
  ],
  showComments: Boolean,
  comments: [
    {
      commentedBy: String,
      comment: String,
    },
  ],
  shares: [
    {
      sharedTo: String,
    },
  ],
});

exports.User = mongoose.model("user", userSchema);
exports.UserLogged = mongoose.model("userLogged", loggedInSchema);
exports.Chatter = mongoose.model("chatter", chatSchema);
exports.Post = mongoose.model("post", postSchema);
