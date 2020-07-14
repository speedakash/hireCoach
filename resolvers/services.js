// const {users,tasks} = require('../constants');
const Service = require("../database/models/service");
const Category = require("../database/models/category");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");
const fs = require("fs");

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
    addService: async (_, { name, category, iconName }) => {
      try {
        const service = await Service.findOne({ name: name });
        if (service) {
          throw new Error("Service already present");
        }

        const newService = new Service({
          name: name,
          category: category,
          iconName: iconName,
        });
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
    // singleUpload: async (_, { file }) => {
    //   try {
    //     const { stream, filename, mimetype, encoding } = await file;

    //     // 1. Validate file metadata.

    //     // 2. Stream file contents into cloud storage:
    //     // https://nodejs.org/api/stream.html

    //     // 3. Record the file upload in your DB.
    //     // const id = await recordFile( … )

    //     const fileStream = stream();

    //     fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`));

    //     return { filename, mimetype, encoding };
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // },
    singleUpload: (parent, args) => {
      return args.file.then((file) => {
        const { createReadStream, filename, mimetype } = file;

        const fileStream = createReadStream();

        fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`));

        return file;
      });
    },
  },
};
