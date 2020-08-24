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
  try {
    const Authorization = arg.request.get("Authorization");

    if (Authorization) {
      const token = Authorization.replace("Bearer ", "");
      const { userId } = jwt.verify(token, APP_SECRET);

      // keep this for now. We'll start with just the id. but want to keep this in case.
      const user = prisma.user.findOne({
        where: {
          id: userId,
        },
      });

      return userId;
    }
  } catch (e) {
    return null;
  }
};

const authenticated = (next) => (root, args, context, info) => {
  if (!context.userId) {
    throw new Error("not authenticated YO");
  }
  return next(root, args, context, info);
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
  authenticated,
};
