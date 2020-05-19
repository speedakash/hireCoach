const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User!]
    user(email: String!): User!
  }

  extend type Mutation {
    signup(input: signupInput): User
    login(input: loginInput): User
  }

  input loginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  input signupInput {
    name: String!
    email: String!
    password: String!
    role: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }
`;
