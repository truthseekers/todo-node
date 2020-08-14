const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function info() {
  return `This is the API of a Hackernews Clone`;
}
async function feed(parent, args, context) {
  return context.prisma.link.findMany();
}

async function me(parent, args, context) {
  const userId = getUserId(context);
  const result = context.prisma.user.findOne({
    where: {
      id: userId,
    },
  });

  return result;
}

async function lists(parent, args, context) {
  return context.prisma.list.findMany();
}
async function listById(obj, args, context, info) {
  const result = await context.prisma.list.findOne({
    where: {
      id: parseInt(args.listId),
    },
  });
  return result;
}
async function todos(parent, args, context) {
  return context.prisma.todo.findMany();
}
async function todoById(obj, args, context, info) {
  const result = await context.prisma.todo.findOne({
    where: {
      id: parseInt(args.todoId),
    },
  });
  return result;
}

module.exports = {
  info,
  feed,
  lists,
  listById,
  todos,
  todoById,
  me,
};
