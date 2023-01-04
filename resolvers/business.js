// const {users,tasks} = require('../constants');
const Business = require("../database/models/business");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");
const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "htuyz7xjo",
  api_key: "324214576767794",
  api_secret: "rP76WjIM2ZU4P8svhJ6AYochyaA",
});

module.exports = {
  Query: {
    allBusiness: async () => {
        try {
          console.log("===", Business.find({}));
          const allbusiness = await Business.find();
          console.log("===!!!!", allbusiness);
          return allbusiness;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
  },

  Mutation: {
    addBusiness: async (_, { input }) => {
        try {
            // const task = await Task.findOne({ name: input.name });
            console.log('inputs', input);
            const newBusiness = new Business({ ...input });
            const result = await newBusiness.save();
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    // updateProfile: async (_, { id, profilePath }) => {
    //   try {
    //     const user = await User.findByIdAndUpdate(
    //       id,
    //       { profilePath: profilePath },
    //       { new: true }
    //     );
    //     return user;
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // },
    // updateUserData: async (_, {id, input }) => {
    //   try {
    //     const user = await User.findByIdAndUpdate(
    //       id,
    //       {name: input.name, email: input.email, state: input.state, city: input.city, locality: input.locality, address: input.address},
    //       { new: true }
    //     );
    //     return user;
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // },
  },
};
