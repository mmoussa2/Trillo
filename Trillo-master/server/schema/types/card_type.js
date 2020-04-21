const mongoose = require("mongoose");
const graphql = require("graphql");

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt} = graphql;

const User = mongoose.model("user")
const Card = mongoose.model("card") ;
const Board = mongoose.model("board");
const List = mongoose.model("list")


const CardType = new GraphQLObjectType({
    name: "CardType",

    fields: () => ({
        id: {type: GraphQLID },
        title: { type: GraphQLString },
        description: {type: GraphQLString },

        user: {
            type: require("./user_type"),
            resolver(parentValue) {
                return User.findById(parentValue._id)
                    .populate("user")
                    .then(card =>{
                        return card.user;
                    })
            }
        },
        board: {
            type: require("./board_type"),
            resolver(parentValue) {
                return Board.findById(parentValue._id)
                    .populate("board")
                    .then(card => {
                        return card.board;
                    })
            }
        },
        list: {
            type: require("./list_type"),
            resolver(parentValue){
                return List.findById(parentValue._id)
                    .populate("list")
                    .then(card => {
                        return card.list;
                    })
            }
        }

    })
})

module.exports = CardType;