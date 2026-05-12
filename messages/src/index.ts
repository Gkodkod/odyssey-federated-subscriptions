import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers';
import { createContext } from './datasources/context';
import { ApolloServerPluginSubscriptionCallback } from '@apollo/server/plugin/subscriptionCallback';
import { PubSub } from 'graphql-subscriptions';

const port = process.env.PORT ?? '4001';
const subgraphName = require('../package.json').name;

const pubsub = new PubSub() as PubSub;

async function main() {
  const typeDefs = gql(readFileSync('./src/schema.graphql', { encoding: 'utf-8' }));

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [
      ApolloServerPluginSubscriptionCallback(), // ← Clean, no options
    ],
  });

  const { url } = await startStandaloneServer(server, {
    context: createContext, // ← Use the existing context function
    listen: { port: Number.parseInt(port) },
  });

  console.log(`🚀  Subgraph ${subgraphName} ready at ${url}`);
  console.log(`Run rover dev --url ${url} --name ${subgraphName}`);
}

main().catch(console.error);
