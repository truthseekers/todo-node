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

    console.log(userId);

    return {
      ...request,
      prisma,
      createToken,
      userId: userId,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
