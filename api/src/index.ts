import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { env } from './env';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: env.INTROSPECTION
});

server.listen()
  .then(({ url }) => {
    console.log(`Server running at ${url}`);
  });
