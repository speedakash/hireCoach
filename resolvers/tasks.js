// const {users,tasks} = require('../constants');
const Task = require("../database/models/tasks");
const User = require("../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Query: {
    getAlltasks: async (_, { skip, limit }) => {
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
    getTotalTaskCount: async () => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.countDocuments();
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getTotalTaskCountByDate: async (_, { date }) => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.countDocuments({ bookingDate: date });
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getTaskByDate: async (_, { date, skip, limit }) => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.find({ bookingDate: date })
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit + 1);
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    tasks: async (_, { consumerEmail, skip, limit }) => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.find({ consumerEmail: consumerEmail })
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit + 1);
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getTotalTaskCountByEmail: async (_,{email, role}) => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.countDocuments(role === "consumer" ? {consumerEmail: email} : {providerEmail: email});
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getTotalTaskByEmail: async (_,{email, role}) => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.find(role === "consumer" ? {consumerEmail: email} : {providerEmail: email});
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    providerAlltasks: async (_, { providerEmail, skip, limit }) => {
      try {
        //console.log("===", Task.find({}));
        const tasks = await Task.find({ providerEmail: providerEmail })
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
    ongoingTask: async (_, { consumerEmail, status1, status2 }) => {
      try {
        const tasks = await Task.find({
          consumerEmail: consumerEmail,
          $or: [
            {
              status: status1,
            },
            {
              status: status2,
            },
          ],
        });
        return tasks;
      } catch {
        console.log(error);
        throw error;
      }
    },
    ongoingProviderTask: async (_, { providerEmail, status1, status2 }) => {
      try {
        const tasks = await Task.find({
          providerEmail: providerEmail,
          $or: [
            {
              status: status1,
            },
            {
              status: status2,
            },
          ],
        });
        return tasks;
      } catch {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    addTask: async (_, { input, taskDetails }) => {
      try {
        // const task = await Task.findOne({ name: input.name });
        console.log('inputs', input);
        const newTask = new Task({ ...input, taskDetails:[taskDetails] });
        const result = await newTask.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateTask: async (_, { id, status, taskDetails }) => {
      try {
        const task = await Task.findByIdAndUpdate(
          id,
          { status: status, $push :{ taskDetails: taskDetails} },
          { new: true }
        );
        return task;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
