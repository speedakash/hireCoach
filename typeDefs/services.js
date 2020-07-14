const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    services: [Service!]
    categories: [Category!]
  }

  extend type Mutation {
    addService(name: String!, category: String!, iconName: String!): Service
    addCategory(input: categoryInput): Category
    singleUpload(file: Upload!): File!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input serviceInput {
    name: String!
    category: String!
    iconName: String!
  }

  type Category {
    name: String!
  }

  input categoryInput {
    name: String!
  }

  type Service {
    name: String!
    category: String!
    iconName: String!
  }
`;
