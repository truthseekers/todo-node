const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const {
  APP_SECRET,
  getUserId,
  createToken,
  getUserIdFromToken,
} = require("./utils");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const List = require("./resolvers/List");
const Todo = require("./resolvers/Todo");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  List,
  Todo,
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    const userId = getUserIdFromToken(request);

    console.log("userId from the index.js. were good so far");
    console.log(userId);
    // console.log("yayayayaya userId: ");
    // console.log(userId);

    //const Authorization = request.request.get("Authorization");
    //console.log("Auth in index.js");
    //console.log(Authorization);

    //if (Authorization) {
    //  const token = Authorization.replace("Bearer ", "");
    //  const { userId } = jwt.verify(token, APP_SECRET);
    // console.log("userId in conditional in index.js");
    // console.log(userId);
    //}

    return {
      ...request,
      prisma,
      createToken,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
