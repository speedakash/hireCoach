const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    tasks(skip: Int, limit: Int): [Task!]
    providerTasks(providerEmail: String!, bookingDate: String!): [Task]
  }

  extend type Mutation {
    addTask(input: taskInput): Task
  }

  input taskInput {
    consumerEmail: String!
    consumerName: String!
    providerEmail: String!
    providerName: String!
    service: String!
    category: String!
    status: String!
    bookingDate: String!
    bookingSlot: String!
  }

  type Task {
    id: String!
    consumerEmail: String!
    consumerName: String!
    providerEmail: String!
    providerName: String!
    service: String!
    category: String!
    status: String!
    bookingDate: String!
    bookingSlot: String!
    createdAt: Date!
  }
`;
