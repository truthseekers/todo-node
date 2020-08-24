const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

console.log("hello from utils!");

function createToken(user) {
  return jwt.sign(user, APP_SECRET); // this is how the return value of the jwt gets populated with user info. You're storing the data into the token here and it gets spit back out when you
  // query for the web token. Because the "user" object is only an id... that's all I get back
}

const getUserIdFromToken = (arg) => {
  const Authorization = arg.request.get("Authorization");

  // console.log("Authorization in utils.js");
  // console.log(Authorization);

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    // console.log("userId from jwt in utils!");
    // console.log(userId);
    return userId;
  }

  //   if (Authorization) {
  //     console.log("in Auth conditional of getUserIdFromToken");
  //     const token = Authorization.replace("Bearer ", "");
  //     // const userObj = jwt.verify(token, APP_SECRET);
  //     const { userId } = jwt.verify(token, APP_SECRET);
  //     //console.log("user obj is.... STILL ");
  //     // console.log(userObj);
  //     // return prisma.user.findOne({
  //     //   where: {
  //     //     id: userId,
  //     //   },
  //     // });
  //     return userId;
  //     // return userObj;
  //   }
};

function getUserId(context) {
  // console.log("getUserId");
  const Authorization = context.request.get("Authorization");
  // console.log(Authorization);
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

function getUser(context) {
  console.log("getting User with getUser.. context is: ");
  console.log(context);
}

module.exports = {
  APP_SECRET,
  getUserId,
  createToken,
  getUserIdFromToken,
};
