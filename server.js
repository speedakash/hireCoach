const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const dotEnv = require("dotenv");

const { connection } = require("./database/util");
const { graphqlUploadExpress } = require("graphql-upload");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

//set env variables
dotEnv.config();

const app = express();

//db connectivity
connection();
//cors
app.use(cors());

//body parser middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

//app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

app.use("/", (req, res, next) => {
  res.send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  console.log(`Graphql end point: ${apolloServer.graphqlPath}`);
});
