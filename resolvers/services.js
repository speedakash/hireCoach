// const {users,tasks} = require('../constants');
const Service = require("../database/models/service");
const Category = require("../database/models/category");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Query: {
    services: async () => {
      try {
        console.log("===", Service.find({}));
        const services = await Service.find();
        return services;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    categories: async () => {
      try {
        console.log("===", Category.find({}));
        const categories = await Category.find();
        return categories;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    addService: async (_, { input }) => {
      try {
        const service = await Service.findOne({ name: input.name });
        if (service) {
          throw new Error("Service already present");
        }

        const newService = new Service({ ...input });
        const result = await newService.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    addCategory: async (_, { input }) => {
      try {
        const category = await Category.findOne({ name: input.name });
        if (category) {
          throw new Error("Category already present");
        }
        const newCategory = new Category({ ...input });
        const result = await newCategory.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
