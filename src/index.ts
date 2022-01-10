import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { start } from "repl";

/**
 * Create an asynchronous function to start the server.
 * At the end of the code, you can see the
 * function is called startServer().
 */
const startServer = async () => {
  /**
   * Here we are creating an instance of express with
   * const app = express() and then creating an HTTP server with
   * const httpServer = createServer(app)
   */

  const app = express();
  const httpServer = createServer(app);

  /**
   * typeDefs define your API schema.
   * Here you describe what data can be read and mutated
   * by the frontend. For example:
   * - Fetch a list of items
   * - Fetch details about a profile
   * - Login a user
   * - Sign up a user
   */
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  /**
   * resolvers are responsible for handling the logic and response
   *  for each typeDef you defined.
   * It's where the business logic is executed.
   * Each typeDef will have a matching resolver.
   * For example, in the typeDefs you might have
   * defined a query to fetch a list of items.
   *  You'll need a matching resolver to handle the query
   * (e.g. find the items in the database and return them)
   */
  const resolvers = {
    Query: {
      hello: () => "Hello world!",
    },
  };

  /**
   * Here you initialize an instance of ApolloServer,
   * passing in the typeDefs and resolvers.
   * This creates your GraphQL server,
   * but as we're using Express,
   * we'll need to apply it as middleware in the next step.
   */
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  /**
   * You must await apolloServer.start()
   * before applying the ApolloServer instance as middleware
   */
  await apolloServer.start();

  /**
   * The ApolloServer instance is applied as middleware to the Express instance, enabling the GraphQL server.
   *  GraphQL is served over a single endpoint in contrast to REST APIs which expose a range of endpoints.
   *  By default, Apollo sets this endpoint to /graphql
   */
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  //eighth step
  httpServer.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
};

startServer();
