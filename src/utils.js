const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

console.log("hello from utils!");

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
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
};
