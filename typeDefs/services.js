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
    addCategory(input: categoryInput): Category
    singleUpload(file: Upload!): File!
    updateService(id: ID!, status: String!): Service
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
    name: String!
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
