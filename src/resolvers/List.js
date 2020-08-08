async function todos(parent, args, context) {
  return context.prisma.todo.findMany({
    where: { listId: parent.id },
  });
}

function postedBy(parent, args, context) {
  return context.prisma.list.findOne({ where: { id: parent.id } }).postedBy();
}

module.exports = {
  todos,
  postedBy,
};
