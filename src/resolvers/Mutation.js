const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')
const { Expo } = require('expo-server-sdk');

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

  const members = await context.prisma.room({id: roomId}).members();


  const expo = new Expo();

  const messages = [];

  members.forEach((member) => {
    member.pushTokens.forEach((token) => {
      // Check that all your push tokens appear to be valid Expo push tokens
      if (Expo.isExpoPushToken(token)) {
        messages.push({
          to: token,
          sound: 'default',
          body: text
        })
      } else {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
      }
    })
  });

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (error) {
        console.error(error);
      }
    }
  })();

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

async function pushToken(parent, args, context) {
  const userId = getUserId(context)

  const {
    token
  } = args;

  let user = await context.prisma.updateUser({
    data: {
      pushTokens: {set: token}
    },
    where: {
      id: userId
    }
  });

  return user;
}

module.exports = {
  createRoom,
  postMessage,
  pushToken,
  signup,
  login
}
