function rooms(parent, args, context) {
  console.log('hi');
  return context.prisma.user({ id: parent.id }).rooms();
}

module.exports = {
  rooms
};
