const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    lists: async (parent, args, context) => {
      return context.prisma.list.findMany();
    },
    todos: async (parent, args, context) => {
      return context.prisma.todo.findMany();
    },
  },
  Mutation: {
    // 2
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    newList: (parent, args, context, info) => {
      const newList = context.prisma.list.create({
        data: {
          title: args.title,
        },
      });
      return newList;
    },
    createTodo: (parent, args, context, info) => {
      const newTodo = context.prisma.todo.create({
        data: {
          isCompleted: false,
          name: args.name,
          list: { connect: { id: parseInt(args.listId) } },
        },
      });
      return newTodo;
    },
  },
  //   Link: {
  //     id: (parent) => parent.id,
  //     description: (parent) => parent.description,
  //     url: (parent) => parent.url,
  //   },
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
