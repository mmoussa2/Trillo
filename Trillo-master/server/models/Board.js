const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  image:{
    type:String,
    require:true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "list"
    }
  ]
});

BoardSchema.statics.addList = (boardId, listId) => {
  const Board = mongoose.model("board");
  const List = mongoose.model("list");

  return Board.findById(boardId).then(board => {
    return List.findById(listId).then(list => {
      board.lists.push(list);
      list.board = board;
      return Promise.all([board.save(), list.save()]).then(
        ([board, list]) => board
      );
    })
  })
}

BoardSchema.statics.removeList = (boardId, listId) => {
  const Board = mongoose.model("board");
  const List = mongoose.model("list");

  return Board.findById(boardId).then(board => {
    return List.findById(listId).then(list => {
      board.lists.pull(list);
      list.board = null;
      return Promise.all([board.save(), list.save()]).then(
        ([board, list]) => board
      );
    })
  })
}


BoardSchema.statics.updateUserBoard = (userId, boardId) => {
  const User = mongoose.model("user");
  const Board = mongoose.model("board");

  return User.findById(userId).then(user => {
    if (!user.board) {
     return Board.findById(boardId).then(newBoard => {
      user.board = newBoard;
      newBoard.users.push(user);

      return Promise.all([user.save(), newBoard.save()]).then(
        ([user, newBoard]) => user
        );
      });
    }
    else{
      return Board.findById(boardId).then(newBoard => {
        newBoard.users.pull(user);
        user.board = null;
        return Promise.all([user.save(), newBoard.save()]).then(
          ([user, newBoard]) => user
        );
      });
    }
  });
};


module.exports = mongoose.model("board", BoardSchema);