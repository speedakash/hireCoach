// const {users,tasks} = require('../constants');
const User = require("../database/models/user");
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
    consumersOrprovider: async (_, { role }) => {
      try {
        const users = await User.find({ role });
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
    providers: async (_, { role, skill }) => {
      try {
        console.log("===", role);
        const user = await User.find({ role, skillDetails:{$elemMatch: {skillName: skill, skillStatus: "active"}} });
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
    addSkills: async (_, { id, services, skilDetail}) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { $push: { mySkills: services, skillDetails:{skillId: mongoose.Types.ObjectId()  , ...skilDetail} } },
          { new: true }
        );
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateSkills: async (_, { id, skilDetail}) => {
      try {
          const user = await User.findOneAndUpdate(
          {_id: id, "skillDetails.skillName": skilDetail.skillName},
          { $set : {
              "skillDetails.$.skillName": skilDetail.skillName,
              "skillDetails.$.skillStatus":skilDetail.skillStatus,
              "skillDetails.$.certification": skilDetail.certification,
              "skillDetails.$.certificationPath":skilDetail.certificationPath,
              "skillDetails.$.courseFeeRange":skilDetail.courseFeeRange,
              "skillDetails.$.courseFeeSelected":skilDetail.courseFeeSelected,
              "skillDetails.$.courseFeeType":skilDetail.courseFeeType,
              "skillDetails.$.courseDeliveryPlace":skilDetail.courseDeliveryPlace,
              "skillDetails.$.courseProvideType":skilDetail.courseProvideType,
              "skillDetails.$.courseSlot":skilDetail.courseSlot,
              "skillDetails.$.multiSessionSlot":skilDetail.multiSessionSlot,
              "skillDetails.$.courseDeliveryAddress":skilDetail.courseDeliveryAddress
            }
          },
          {new: true}
        );
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateUser: async (_, { id, status }) => {
      try {
        const user = await User.findByIdAndUpdate(
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
    uploadProfile: async (parent, { file }) => {
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
    uploadCertificate: async (parent, { file }) => {
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
    updateProfile: async (_, { id, profilePath }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { profilePath: profilePath },
          { new: true }
        );
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateUserData: async (_, {id, input }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          {name: input.name, email: input.email, state: input.state, city: input.city, locality: input.locality, address: input.address},
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
