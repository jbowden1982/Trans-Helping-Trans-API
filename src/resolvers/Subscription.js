function newRoomSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.room({ mutation_in: ['CREATED'] }).node()
}

function postMessageSubscribe(parent, args, context) {
  return context.prisma.$subscribe.message({
    mutation_in: ['CREATED', 'UPDATED', 'DELETED'],
    node: {
      room: {
        id: args.roomId
      }
    }
  }).node()
}

const newRoom = {
  subscribe: newRoomSubscribe,
  resolve: payload => {
    return payload;
  }
}

const messages = {
  subscribe: postMessageSubscribe,
  resolve: payload => {
    return payload;
  }
}
module.exports = {
  newRoom,
  messages
}
