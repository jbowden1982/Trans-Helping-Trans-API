function createdBy(parent, args, context) {
  return context.prisma.room({ id: parent.id }).createdBy();
}

function members(parent, args, context) {
  return context.prisma.room({ id: parent.id }).members();
}

function messages(parent, args, context) {
  return context.prisma.room({ id: parent.id }).messages({
    orderBy: args.orderBy
  });
}

module.exports = {
  createdBy,
  members,
  messages
}
