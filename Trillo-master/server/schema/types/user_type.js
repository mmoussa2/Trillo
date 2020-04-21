const mongoose = require("mongoose");
const modelIndex = require('../../models/index');
const BoardType = require('./board_type');
const Board = mongoose.model("board");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;
const models = require("../../models/index");
const User = mongoose.model("user")
const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    loggedIn: {
      type: GraphQLBoolean
    },
    token: {
      type: GraphQLString
    },
    boards: {
      type: new GraphQLList(BoardType),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("boards")
          .then(user => user.boards);
      }
    }
  })
});
module.exports = UserType;
