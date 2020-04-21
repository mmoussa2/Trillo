const mongoose = require("mongoose");
const graphql = require("graphql");

const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLInt} = graphql;

const Comment = mongoose.model("comment");
const User = mongoose.model("user");
const Card = mongoose.model("card")

const CommentType = new GraphQLObjectType({
    name: "CommentType",

    fields: () => ({
        _id: {type: GraphQLID},
        body: {type: GraphQLString},

        user: {
            type: require("./user_type"),
            resolver(parentValue){
                return User.findById(parentValue._id)
                      .populate("user")
                      .then(comment =>{
                          return comment.user;
                      })
            }
        },
        
        card: {
            type: require("./card_type"),
            resolver(parentValue){
                return Card.findById(parentValue._id)
                    .populate("card")
                    .then(comment =>{
                        return comment.card;
                    })
            }
        }

    })
})

module.exports = CommentType;