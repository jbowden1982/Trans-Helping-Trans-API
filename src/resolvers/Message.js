function room(parent, args, context) {
  return context.prisma.message({ id: parent.id }).room();;
}

function owner(parent, args, context) {
  return context.prisma.message({ id: parent.id }).owner();;
}
module.exports = {
  owner,
  room
};
