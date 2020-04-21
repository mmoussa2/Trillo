import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { NEW_LIST, ADD_BOARD_LIST } from "../../graphql/mutations";
import { FETCH_BOARD } from "../../graphql/queries";

function NewList(props) {
  const [newList] = useMutation(NEW_LIST);
  const [addBoardList] = useMutation(ADD_BOARD_LIST, {
    update(cache, { data: { addBoardList } }) {
      cache.writeQuery({
        query: FETCH_BOARD,
        variables: { id: props.boardId },
        data: { board: addBoardList },
      });
    },
  });
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    newList({ variables: { title } }).then(({ data }) =>
      addBoardList({
        variables: {
          boardId: props.boardId,
          listId: data.newList.id,
        },
      })
    );
    setOpen(false);
    setTitle("");
  }

  if (open) {
    return (
      <form className="list-add-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter list title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="card-buttons">
          <div className="btn-card-add">
            <button disabled={!title} type="submit">
              Add List
            </button>
          </div>

          <div className="btn-card-cancel">
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <button className="list-add" onClick={() => setOpen(true)}>
        Add another list
      </button>
    );
  }
}

export default NewList;
