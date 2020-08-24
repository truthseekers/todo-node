const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  APP_SECRET,
  getUserId,
  createToken,
  authenticated,
} = require("../utils");

async function deleteTodo(parent, args, context, info) {
  console.log("in individual deleteTodo");
  const userId = getUserId(context);
  const todoTest = await context.prisma.todo.findOne({
    where: {
      id: parseInt(args.todoId),
    },
  });
  console.log("in deleteTodo. context.userId: " + context.userId);
  console.log("in deleteTodo. todoTest.postedById " + todoTest.postedById);
  if (todoTest.postedById == userId) {
    console.log("user has permission to delete. Deleting...");
    const todo = await context.prisma.todo.delete({
      where: { id: parseInt(args.todoId) },
    });
    return todo;
  } else {
    console.log("no deletion occurred FOR DELETETODO");
  }
}
async function updateTodo(parent, args, context, info) {
  const todoTest = await context.prisma.todo.update({
    where: {
      id: parseInt(args.todoId),
    },
    data: { isCompleted: args.isCompleted },
  });
  return todoTest;
}

async function deleteList(parent, args, context, info) {
  console.log("0: deleteList. parent: ");
  console.log(parent);
  const userId = getUserId(context);
  console.log("1: userId: ", userId);

  const listTest = await context.prisma.list.findOne({
    where: {
      id: parseInt(args.listId),
    },
  });

  if (listTest.postedById == userId) {
    console.log("2: passed listTest");

    const deletedTodos = await context.prisma.todo.deleteMany({
      where: {
        listId: parseInt(args.listId),
      },
    });

    const list = await context.prisma.list.delete({
      where: {
        id: parseInt(args.listId),
      },
    });
    let obj = { todos: deletedTodos, list };
    console.log("3: obj: ");
    console.log(obj);
    return obj;
  } else {
    console.log("no deletion occurred FOR DELETELIST");
  }
}

module.exports = {
  // signup,
  async signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10);

    // 2
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });

    // 3
    console.log("Does createToken work????");
    const token = context.createToken({ userId: user.id });
    // const token = jwt.sign({ userId: user.id }, APP_SECRET);

    // 4
    return {
      token,
      user,
    };
  },
  async login(parent, args, context, info) {
    // 1
    const user = await context.prisma.user.findOne({
      where: { email: args.email },
    });
    if (!user) {
      throw new Error("No such user found");
    }

    // 2
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    console.log("CONTEXT CREATE TOKEN token works in login!");
    const token = context.createToken({ userId: user.id });
    // const token = jwt.sign({ userId: user.id }, APP_SECRET);

    // 3
    return {
      token,
      user,
    };
  },
  post(parent, args, context, info) {
    const userId = getUserId(context);

    return context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      },
    });
  },
  newList: authenticated((parent, args, context, info) => {
    const userId = getUserId(context);
    const newList = context.prisma.list.create({
      data: {
        title: args.title,
        postedBy: { connect: { id: userId } },
      },
    });
    return newList;
  }),
  createTodo: authenticated((parent, args, context, info) => {
    const userId = getUserId(context);
    const newTodo = context.prisma.todo.create({
      data: {
        isCompleted: false,
        name: args.name,
        listId: parseInt(args.listId),
        postedBy: { connect: { id: userId } },
      },
    });
    return newTodo;
  }),
  deleteList,
  deleteTodo,
  updateTodo,
};
