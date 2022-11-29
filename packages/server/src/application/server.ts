import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const PORT = 4001;

const createApp = async (): Promise<void> => {
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    introspection: true,
  });

  server.listen({ port: PORT });
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
};

createApp();
