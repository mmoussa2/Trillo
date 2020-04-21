import React from "react";
import { useMutation } from "react-apollo";
import { DELETE_LIST, REMOVE_BOARD_LIST } from "../../graphql/mutations";
import { FETCH_BOARD, FETCH_LIST } from "../../graphql/queries";

function DeleteList(props) {
  // const [deleteList] = useMutation(DELETE_LIST, {
  //   update(cache, { data: { deleteList } }) {
  //     cache.writeQuery({
  //       query: FETCH_LIST,
  //       variables: { id: props.listId },
  //       data: { board: deleteList }
  //     })
  //   }
  // });
  const [removeBoardList] = useMutation(REMOVE_BOARD_LIST, {
    update(cache, { data: { removeBoardList } }) {
      cache.writeQuery({
        query: FETCH_BOARD,
        variables: { id: props.boardId },
        data: { board: removeBoardList },
      });
    },
  });

  function handleClick() {
    //deleteList({variables: {id: props.listId}})
    removeBoardList({
      variables: {
        boardId: props.boardId,
        listId: props.listId,
      },
    });
  }

  return (
    <button onClick={handleClick}>
      <h2>X</h2>
    </button>
  );
}

export default DeleteList;
