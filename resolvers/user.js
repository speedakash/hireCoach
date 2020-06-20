// const {users,tasks} = require('../constants');
const User = require("../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Query: {
    users: async () => {
      try {
        console.log("===", User.find({}));
        const users = await User.find();
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    user: async (_, { email }) => {
      try {
        console.log("===", email);
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    providers: async (_, { role }) => {
      try {
        console.log("===", role);
        const user = await User.find({ role });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error("Email already in use");
        }
        const hashPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, passwrod: hashPassword });
        const result = await newUser.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isPasswordValid = input.password === user.password ? true : false;
        if (!isPasswordValid) {
          throw new Error("Invalid Password");
        }
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateSkills: async (_, { id, services }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { $set: { mySkills: services } },
          { new: true }
        );
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
