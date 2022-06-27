const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User!]
    user(email: String!): User!
    providers(role: String!, skill: String!): [User!]
    consumersOrprovider(role: String!): [User]
  }

  extend type Mutation {
    signup(input: signupInput): User
    login(input: loginInput): User
    addSkills(id: ID!, services: String, skilDetail: SkillStatus): User
    updateSkills(id: ID!, skilDetail: SkillStatus): User
    updateUser(id: ID!, status: String!): User
    updateUserData(id: ID!, input: userUpdateInput): User
    updateProfile(id: ID!, profilePath: String!): User
    uploadProfile(file: Upload!): Profile!
    uploadCertificate(file: Upload!): Certificate!
  }

  input loginInput {
    email: String!
    password: String!
  }

  type Profile {
    filename: String!
    path: String!
  }

  type Certificate {
    filename: String!
    path: String!
  }

  type Token {
    token: String!
  }

  input userUpdateInput {
    name: String!
    email: String!
    state: String!
    city: String!
    locality: String!
    address: String!
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

  input SkillStatus{
    skillName: String
    skillStatus: String
    certification: Boolean
    certificationPath: String
    courseFeeRange: String
    courseFeeSelected: String
    courseFeeType: String
    courseDeliveryPlace: [String]
    courseDeliveryAddress: String
    courseProvideType: [String]
    courseSlot: [String]
    multiSessionSlot: [String]
   }
   type SkillDetails{
    id: ID!
    skillName: String
    skillStatus: String
    certification: Boolean
    certificationPath: String
    courseFeeRange: String
    courseFeeSelected: String
    courseFeeType: String
    courseDeliveryPlace: [String]
    courseDeliveryAddress: String
    courseProvideType: [String]
    courseSlot: [String]
    multiSessionSlot: [String]
   }

  type User {
    id: ID!
    name: String
    email: String
    role: String
    gender: String
    state: String
    city: String
    locality: String
    address: String
    createdAt: Date
    status: String
    updatedAt: Date
    mySkills: [String]
    profilePath: String
    rating: String
    skillDetails: [SkillDetails]
  }
`;
