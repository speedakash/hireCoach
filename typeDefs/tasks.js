const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getAlltasks: [Task!]
    tasks(consumerEmail: String!, skip: Int, limit: Int): [Task!]
    ongoingTask(
      consumerEmail: String!
      status1: String!
      status2: String!
    ): [Task!]
    ongoingProviderTask(
      providerEmail: String!
      status1: String!
      status2: String!
    ): [Task!]
    providerTasks(providerEmail: String!, bookingDate: String!): [Task]
    providerAlltasks(providerEmail: String!, skip: Int, limit: Int): [Task]
  }

  extend type Mutation {
    addTask(input: taskInput): Task
    updateTask(id: ID!, status: String!): Task
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
    id: ID!
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
    updatedAt: Date!
  }
`;
