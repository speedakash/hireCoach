const { gql } = require("@apollo/server");

module.exports = `
  scalar Upload
  extend type Query {
    getAlltasks(skip: Int, limit: Int): [Task!]
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
    getTotalTaskCount: Int
    getTotalTaskCountByDate(date: Date!): Int
    getTotalTaskCountByEmail(email: String!, role: String!): Int
    getTotalTaskByEmail(email: String!, role: String!): [Task]
    getTaskByDate(date: String!, skip: Int, limit: Int): [Task]
  }

  extend type Mutation {
    addTask(input: taskInput, taskDetails:TaskStatus): Task
    updateTask(id: ID!, status: String!, taskDetails:TaskStatus): Task
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
    taskType: String!
    courseDeliveryMethod: String
    courseDeliveryAddress: String
    courseStartDate: String
    courseEndDate: String
    courseVideoLink: String
    paymentStatus: Boolean
    paymentType: String
    totalPayment: Int
  }

  type Count {
    total: Int!
  }

 input TaskStatus{
  status: String!
  startDate: String!
  endDate: String!
 }
 type TaskDetails{
  status: String!
  startDate: String!
  endDate: String!
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
    taskDetails: [TaskDetails]
    bookingDate: String!
    bookingSlot: String!
    createdAt: Date!
    updatedAt: Date!
    taskType: String!
    courseDeliveryMethod: String
    courseDeliveryAddress: String
    courseStartDate: String
    courseEndDate: String
    courseVideoLink: String
    paymentStatus: Boolean
    paymentType: String
    totalPayment: Int
  }
`;
