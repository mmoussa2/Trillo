const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const models = require("../../models/index");
const BoardType = require("./board_type");
const CardType = require("./card_type");
const Board = mongoose.model("board");
const List = mongoose.model("list");
const Card = mongoose.model("card");

const ListType = new GraphQLObjectType({
  name: "ListType",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    cards: {
      type: new GraphQLList(CardType),
      resolve(parentValue) {
        return List.findById(parentValue.id)
          .populate("cards")
          .then(list => list.cards);
      }
    }
  })
})

module.exports = ListType;