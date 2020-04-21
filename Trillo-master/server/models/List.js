const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "board"
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "card"
    }
  ]
})

ListSchema.statics.addCard = (listId, cardId) => {
  const List = mongoose.model("list");
  const Card = mongoose.model("card");

  return List.findById(listId).then(list => {
    return Card.findById(cardId).then(card => {
      list.cards.push(card);
      card.list = list;
      return Promise.all([list.save(), card.save()]).then(
        ([list, card]) => list
      );
    })
  })
}

ListSchema.statics.removeCard = (listId, cardId) => {
  const List = mongoose.model("list");
  const Card = mongoose.model("card");

  return List.findById(listId).then(list => {
    return Card.findById(cardId).then(card => {
      list.cards.pull(card);
      card.list = null;
      return Promise.all([list.save(), card.save()]).then(
        ([list, card]) => list
      );
    })
  })
}

module.exports = mongoose.model("list", ListSchema);