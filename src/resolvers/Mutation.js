const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function postMessage(parent, args, context, info) {
  const userId = getUserId(context);

  const {
    text,
    roomId
  } = args;

  const message = await context.prisma.createMessage({
    text,
    user: { connect: { id: userId }},
    room: { connect: { id: roomId }}
  })

  return message;
}

async function createRoom(parent, args, context, info) {
  const userId = getUserId(context)

  const room = await context.prisma.createRoom({
    name: args.name,
    description: args.description,
    createdBy: { connect: { id: userId } },
    members: {connect: [{id: userId}]}
  });

  context.prisma.updateUser({
    data: {
      rooms: {connect: [{id: room.id}]}
    },
    where: {
      id: userId
    }
  });

  return room;
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ username: args.username })

  console.log('in signin');
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}


module.exports = {
  createRoom,
  postMessage,
  signup,
  login
}
