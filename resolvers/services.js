// const {users,tasks} = require('../constants');
const Service = require("../database/models/service");
const Category = require("../database/models/category");
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
    addService: async (_, { name, category, iconName, iconPath, status }) => {
      try {
        const service = await Service.findOne({ name: name });
        if (service) {
          throw new Error("Service already present");
        }

        const newService = new Service({
          name: name,
          category: category,
          iconName: iconName,
          iconPath: iconPath,
          status: status,
        });
        const result = await newService.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    addCategory: async (_, { name, status }) => {
      try {
        const category = await Category.findOne({ name: name, status: status });
        if (category) {
          throw new Error("Category already present");
        }
        const newCategory = new Category({ name: name, status: status });
        const result = await newCategory.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateService: async (_, { id, status }) => {
      try {
        const user = await Service.findByIdAndUpdate(
          id,
          { status: status },
          { new: true }
        );
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateCategory: async (_, { id, status }) => {
      try {
        const user = await Category.findByIdAndUpdate(
          id,
          { status: status },
          { new: true }
        );
        return user;
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
    singleUpload: async (parent, { file }) => {
      const { filename, createReadStream } = await file;

      try {
        const result = await new Promise((resolve, reject) => {
          createReadStream().pipe(
            cloudinary.uploader.upload_stream((error, result) => {
              if (error) {
                reject(error);
              }

              resolve(result);
            })
          );
        });
        console.log(result);

        if (result) {
          const url = result.secure_url;
          return { filename: filename, path: url };
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
