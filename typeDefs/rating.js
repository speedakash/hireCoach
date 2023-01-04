const { gql } = require("@apollo/server");

module.exports = `
  scalar Upload
  extend type Query {
    ratings(userEmail: String!, userRole: String!): [Ratings]
    ratingByConsumerTaskId(consumerEmail: String!, taskId: String!): [Ratings]
  }

  extend type Mutation {
    addRating(input: RatingInput): Ratings
  }

  

  input RatingInput {
    rating: String!
    providerName: String!
    providerEmail: String!
    consumerName: String!
    consumerEmail: String!
    service: String!
    serviceIcon: String!
    comment: String
    taskId: String!
  }

  type Ratings {
    id: ID!
    rating: String!
    providerName: String!
    providerEmail: String!
    consumerName: String!
    consumerEmail: String!
    service: String!
    serviceIcon: String!
    comment: String
    taskId: String!
  }
`;
