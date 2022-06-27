const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    services: [Service!]
    categories: [Category!]
  }

  extend type Mutation {
    addService(
      name: String!
      category: String!
      iconName: String!
      iconPath: String!
      status: String
    ): Service
    addCategory(name: String!, status: String!): Category
    singleUpload(file: Upload!): File!
    updateService(id: ID!, status: String!): Service
    updateCategory(id: ID!, status: String!): Category
  }

  type File {
    filename: String!
    path: String!
  }

  input serviceInput {
    name: String!
    category: String!
    iconName: String!
    iconPath: String!
    status: String
  }

  type Category {
    id: ID!
    name: String!
    status: String!
  }

  input categoryInput {
    name: String!
  }

  type Service {
    id: ID!
    name: String!
    category: String!
    iconName: String!
    iconPath: String!
    status: String
  }
`;
