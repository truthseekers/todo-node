async function list(parent, args, context) {
  console.log("parent: ");
  console.log(parent);
  return context.prisma.list.findOne({
    where: { id: parent.listId },
  });
}

function postedBy(parent, args, context) {
  return context.prisma.todo.findOne({ where: { id: parent.id } }).postedBy();
}

module.exports = {
  list,
  postedBy,
};
