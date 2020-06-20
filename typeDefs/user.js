const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User!]
    user(email: String!): User!
    providers(role: String!): [User!]
  }

  extend type Mutation {
    signup(input: signupInput): User
    login(input: loginInput): User
    updateSkills(id: ID!, services: [String]): User
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
    gender: String!
    state: String!
    city: String!
    locality: String!
    address: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    gender: String!
    state: String!
    city: String!
    locality: String!
    address: String!
    createdAt: Date!
    updatedAt: Date!
    mySkills: [String]
  }
`;
