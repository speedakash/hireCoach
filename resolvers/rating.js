// const {users,tasks} = require('../constants');
const Ratings = require("../database/models/rating");
const User = require("../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "htuyz7xjo",
  api_key: "324214576767794",
  api_secret: "rP76WjIM2ZU4P8svhJ6AYochyaA",
});

module.exports = {
  Query: {
    ratings: async (_, { userEmail, userRole }) => {
      try {
        const ratings = await Ratings.find(userRole === "provider" ? {providerEmail: userEmail}:{consumerEmail: userEmail});
        return ratings;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    ratingByConsumerTaskId: async (_, { consumerEmail, taskId }) => {
        try {
          const ratings = await Ratings.find({consumerEmail: consumerEmail, taskId: taskId});
          return ratings;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
  },

  Mutation: {
    addRating: async (_, {input }) => {
      try {
        const newRating = new Ratings({ ...input });
        const result = await newRating.save();
        const ratingCount = await Ratings.countDocuments({providerEmail: input.providerEmail})
        const userrating = await User.findOne({ email : input.providerEmail });
        const userRatingUpdate = await User.findOneAndUpdate(  
            {email: input.providerEmail },
            { rating: userrating.rating ? (parseFloat(userrating.rating)+ parseFloat(input.rating))/ratingCount : parseFloat(input.rating)/ratingCount },
            { new: true }
          );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
