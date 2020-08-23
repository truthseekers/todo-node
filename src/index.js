const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
