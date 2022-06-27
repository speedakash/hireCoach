const { gql } = require("apollo-server-express");

const userTypeDefs = require("./user");
const serviceTypeDefs = require("./services");
const taskTypeDefs = require("./tasks");
const rateTypeDefs = require("./rating");

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDefs, serviceTypeDefs, taskTypeDefs, rateTypeDefs];
