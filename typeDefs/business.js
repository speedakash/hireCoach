const { gql } = require("@apollo/server");

module.exports = `
  scalar Upload
  extend type Query {
    allBusiness: [Business!]
  }

  extend type Mutation {
    addBusiness(input: businessInput): Business
    updateBusiness(id: ID!, input: businessInput): Business
    updateBusinessLogo(id: ID!, profilePath: String!): Business
    uploadBusiness(file: Upload!): BusinessLogo!
  }

  type BusinessLogo {
    filename: String!
    path: String!
  }

  input businessInput {
    name: String
    country: String
    city: String
    address: String
    createdAt: Date
    status: String
    updatedAt: Date
    businessCategory: [String]
    businessSkills: [String]
    logoPath: String
  }


  type Business {
    id: ID!
    name: String
    country: String
    city: String
    address: String
    createdAt: Date
    status: String
    updatedAt: Date
    businessCategory: [String]
    businessSkills: [String]
    logoPath: String
    rating: String
  }
`;
