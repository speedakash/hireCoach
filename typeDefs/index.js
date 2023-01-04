const { gql } = require("@apollo/server");

const userTypeDefs = require("./user");
const serviceTypeDefs = require("./services");
const taskTypeDefs = require("./tasks");
const rateTypeDefs = require("./rating");
const businessTypeDefs = require("./business");

const typeDefs = `
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDefs, serviceTypeDefs, taskTypeDefs, rateTypeDefs, businessTypeDefs];
