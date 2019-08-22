const { getUserId } = require('../utils')

function rooms(parent, args, context, info) {
  return context.prisma.rooms({orderBy: args.orderBy})
}

function users(parent, args, context, info) {
  return context.prisma.users()
}
function room(parent, args, context) {
  const userId = getUserId(context)

  return context.prisma.room({id: args.roomId})
}
function currentUser(parent, args, context) {
  const userId = getUserId(context)

  return context.prisma.user({id: userId})
}

function messages(parent, args, context) {
  const userId = getUserId(context);

  const {
    roomId
  } = args;

  console.log(args);
  return context.prisma.messages(roomId ? {
    orderBy: args.orderBy,
    where: {
      room: {
        id: roomId
      }
    }
  } : {orderBy: args.orderBy})
}

module.exports = {
  rooms,
  users,
  room,
  messages,
  currentUser
}
