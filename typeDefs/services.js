const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    services: [Service!]
    categories: [Category!]
  }

  extend type Mutation {
    addService(input: serviceInput): Service
    addCategory(input: categoryInput): Category
  }

  input serviceInput {
    name: String!
    category: [String!]
  }

  type Category {
    name: String!
  }

  input categoryInput {
    name: String!
  }

  type Service {
    name: String!
    category: [String!]
  }
`;
