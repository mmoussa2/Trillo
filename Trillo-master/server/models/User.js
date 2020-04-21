const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "board"
    }
  ]
});

UserSchema.statics.addBoard = (userId, boardId) => {
  const User = mongoose.model("user");
  const Board = mongoose.model("board");

  return User.findById(userId).then(user => {
    return Board.findById(boardId).then(board => {
      user.boards.push(board);
      return Promise.all([user.save(), board.save()]).then(
        ([user, board]) => user
      );
    })
  })
};

UserSchema.statics.removeBoard = (userId, boardId) => {
  const User = mongoose.model("user");
  const Board = mongoose.model("board");

  return User.findById(userId).then(user => {
    return Board.findById(boardId).then(board => {
      user.boards.pull(board);
      return Promise.all([user.save(), board.save()]).then(
        ([user, board]) => user
      );
    })
  })
}

module.exports = mongoose.model("user", UserSchema);