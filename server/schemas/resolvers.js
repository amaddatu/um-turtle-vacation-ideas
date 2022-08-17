const { User, Tech, Matchup } = require('../models');
const { ObjectId } = require("mongoose").Types;
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },

    users: async () => {
      return User.find({});
    },

    user: async (parent, { _id }) => {
      return User.findOne({_id: ObjectId(_id)});
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    tomatoMyself: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return {
          turtle: {
            name: "Tomato",
            attributes: [
              "Sweet",
              "Slow",
              "Red"
            ]
          },
          user: user
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // you will need to use insomnia a similar token from a previous login to get this working
    // POST to /graphql
    // {
    // "token": "<token here>",
    // "query": "query MyInfo{ me{ _id \nname \nemail }}",
    // "operationName": "MyInfo",
    // "variables": {}
    // }

    test: async () =>{
      // Dog{
      //   _id: ID!
      //   name: String
      // }

      // later on, when we have the Dog model, we can replace this test data with
      // the Dog model
      return {
        _id: "0001",
        name: "Test Dog"
      };
    }
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    createUser: async (parent, {name, email, password}) => {
      const user = await User.create({name, email, password});

      const token = signToken(user);
      return {
        token: token,
        user: user
      };
    },
    createUserNoToken: async (parent, {name, email, password}) => {
      const user = await User.create({name, email, password});
      return user;
    },

    // TODO login
    login: async(parent, {email, password}) => {
      // make sure the user exists
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      // check the password
      const correctPw = await user.comparePassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      // get the user token
      const token = signToken(user);
      return {token, user};
    }
  },
};

module.exports = resolvers;
