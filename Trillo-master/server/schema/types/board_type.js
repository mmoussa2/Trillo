const mongoose = require("mongoose");
const modelIndex = require('../../models/index');
const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const models = require("../../models/index");
const User = mongoose.model("user");
const UserType = require("./user_type");
const Board = mongoose.model("board");
const List = mongoose.model("list");
const ListType = require("./list_type");



const BoardType = new GraphQLObjectType({
  name: "BoardType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    image:{type:GraphQLString},
    users: {
      type: new GraphQLList(require('./user_type')),
      resolve(parentValue, _) {
        return Board.findById(parentValue.id)
          .populate("users")
          .then(board => board.users);
       }
      },
    lists: {
      type: new GraphQLList(ListType),
      resolve(parentValue) {
        return Board.findById(parentValue.id)
          .populate("lists")
          .then(board => board.lists);
      }
    }
  })
});


module.exports = BoardType;
