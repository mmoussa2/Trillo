const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: "board"

    },

    list: {
        type: Schema.Types.ObjectId,
        ref: "list"
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "comments"
        }
    ]
	
})

    

// CardSchema.statics.updateCard = (id,newTitle,newDescription) => {
//     const Card = mongoose.model("card");

//     return Card.findById(id)
//        .then(card =>{
//            if(card){
//                card.title = newTitle;
//                card.description = newDescription;
//            }
//            else{
//                throw new Error("The card does not exist");
//            }
//        })
// }

 module.exports = mongoose.model("card", CardSchema);