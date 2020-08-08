const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const List = require("./resolvers/List");
const Todo = require("./resolvers/Todo");

// 2
const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  List,
  Todo,
  // Query: {
  //   info: () => `This is the API of a Hackernews Clone`,
  //   feed: () => async (parent, args, context) => {
  //     return context.prisma.link.findMany();
  //   },
  //   lists: async (parent, args, context) => {
  //     return context.prisma.list.findMany();
  //   },
  //   listById: async (obj, args, context, info) => {
  //     const result = await prisma.list.findOne({
  //       where: {
  //         id: parseInt(args.listId),
  //       },
  //     });
  //     return result;
  //   },
  //   todos: async (parent, args, context) => {
  //     return context.prisma.todo.findMany();
  //   },
  //   todoById: async (obj, args, context, info) => {
  //     const result = await prisma.todo.findOne({
  //       where: {
  //         id: parseInt(args.todoId),
  //       },
  //     });
  //     return result;
  //   },
  // },
  // Mutation: {
  //   // 2
  //   post: (parent, args, context, info) => {
  //     const newLink = context.prisma.link.create({
  //       data: {
  //         url: args.url,
  //         description: args.description,
  //       },
  //     });
  //     return newLink;
  //   },
  //   newList: (parent, args, context, info) => {
  //     const newList = context.prisma.list.create({
  //       data: {
  //         title: args.title,
  //       },
  //     });
  //     return newList;
  //   },
  //   createTodo: (parent, args, context, info) => {
  //     const newTodo = context.prisma.todo.create({
  //       data: {
  //         isCompleted: false,
  //         name: args.name,
  //         listId: parseInt(args.listId),
  //       },
  //     });
  //     return newTodo;
  //   },
  //   deleteTodo: async (parent, args, context, info) => {
  //     const todo = await context.prisma.todo.delete({
  //       where: { id: parseInt(args.todoId) },
  //     });
  //     return todo;
  //   },
  //   deleteList: async (parent, args, context, info) => {
  //     const deletedTodosCount = await context.prisma.todo.deleteMany({
  //       where: { listId: parseInt(args.listId) },
  //     });
  //     const list = await context.prisma.list.delete({
  //       where: { id: parseInt(args.listId) },
  //     });
  //     // return list;

  //     let obj = { deletedTodosCount, list };
  //     console.log("heres the object: ");
  //     console.log(obj);
  //     return obj;
  //     // return deletedTodosCount;
  //   },
  // },
  // List: {
  //   todos: async (parent, args, context) => {
  //     return context.prisma.todo.findMany({
  //       where: { listId: parent.id },
  //     });
  //   },
  // },
  // Todo: {
  //   list: async (parent, args, context) => {
  //     console.log("parent: ");
  //     console.log(parent);
  //     return context.prisma.list.findOne({
  //       where: { id: parent.listId },
  //     });
  //   },
  // },
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
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
