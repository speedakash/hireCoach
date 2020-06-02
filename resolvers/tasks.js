// const {users,tasks} = require('../constants');
const Task = require("../database/models/tasks");
const User = require("../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Query: {
    tasks: async (_, { skip, limit }) => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.find()
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit + 1);
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    providerTasks: async (_, { providerEmail, bookingDate }) => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.find({
          providerEmail: providerEmail,
          bookingDate: bookingDate,
        });
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    addTask: async (_, { input }) => {
      try {
        // const task = await Task.findOne({ name: input.name });

        const newTask = new Task({ ...input });
        const result = await newTask.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
