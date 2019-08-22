function rooms(parent, args, context) {
  return context.prisma.user({ id: parent.id }).rooms();
}
module.exports = {
  rooms
};
