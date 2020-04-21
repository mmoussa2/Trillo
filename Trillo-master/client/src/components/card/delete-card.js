import React from "react";
import { Mutation } from "react-apollo";

import { REMOVE_LIST_CARD } from "../../graphql/mutations";
import { FETCH_CARDS, GET_LIST_CARDS } from "../../graphql/queries";

const linkStyle = {
  cursor: "pointer",
  fontSize: "10px",
  color: "red",
};

const DeleteCard = (props) => {
  return (
    <Mutation
      mutation={REMOVE_LIST_CARD}
      refetchQueries={() => {
        return [
          {
            query: FETCH_CARDS,
          },
        ];
      }}
    >
      {(removeListCard, { data }) => (
        <a
          style={linkStyle}
          onClick={(e) => {
            e.preventDefault();
            removeListCard({
              variables: {
                listId: props.listId,
                cardId: props.cardId,
              },
              refetchQueries: [
                {
                  query: GET_LIST_CARDS,
                  variables: { listId: props.listId },
                  data: { list: removeListCard },
                },
              ],
            });
          }}
        >
          <h1>x</h1>
        </a>
      )}
    </Mutation>
  );
};

export default DeleteCard;
