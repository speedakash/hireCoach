// const express = require("express");
// const { ApolloServer, gql } = require("@apollo/server");
// const { expressMiddleware } = require('@apollo/server/express4');
// const cors = require("cors");
// const dotEnv = require("dotenv");

// const { connection } = require("./database/util");
// const { graphqlUploadExpress } = require("graphql-upload");

// const resolvers = require("./resolvers");
// const typeDefs = require("./typeDefs");

// //set env variables
// dotEnv.config();

// const app = express();

// //db connectivity
// connection();
// //cors
// app.use(cors());

// //body parser middleware
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// expressMiddleware({ app, path: "/graphql" });

// //app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

// app.use("/", (req, res, next) => {
//   res.send({ message: "Hello" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on PORT: ${PORT}`);
//   console.log(`Graphql end point: ${apolloServer.graphqlPath}`);
// });


const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const { connection } = require("./database/util");
const app = express();
const dotEnv = require("dotenv");
dotEnv.config();
connection();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
const startFunction = async() =>{
  await server.start();
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  
  await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}
startFunction();
