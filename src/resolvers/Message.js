function room(parent, args, context) {
  return context.prisma.message({ id: parent.id }).room();;
}

function user(parent, args, context) {
  return context.prisma.message({ id: parent.id }).user();;
}
module.exports = {
  user,
  room
};
