const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Message = require('./resolvers/Message');
const User = require('./resolvers/User');
const Room = require('./resolvers/Room');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Message,
  User,
  Room
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  }
});

server.start(() => console.log('Server is running on http://localhost:4000'));

