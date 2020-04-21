import React, { useState } from "react";
import { useMutation } from "react-apollo";

import { CREATE_CARD, ADD_LIST_CARD } from "../../graphql/mutations";
import { GET_LIST_CARDS } from "../../graphql/queries";
import "./card-css/card.css";

function AddCard(props) {
  const [newCard] = useMutation(CREATE_CARD);
  const [addListCard] = useMutation(ADD_LIST_CARD);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    newCard({
      variables: { title, description },
    }).then(({ data }) => {
      addListCard({
        variables: {
          listId: props.listId,
          cardId: data.newCard.id,
        },
        refetchQueries: [
          {
            query: GET_LIST_CARDS,
            variables: { listId: props.listId },
            data: { list: addListCard },
          },
        ],
      });

      setOpen(false);
      setTitle("");
      setDescription("");
    });
  }

  if (open) {
    return (
      <div>
        <form className="card-add-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="card-title-textbox"
            type="text"
            placeholder="Enter card title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="card-title-textbox"
            type="text"
            placeholder="Enter card description...(optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="card-buttons">
            <div className="btn-card-add">
              <button disabled={!title} type="submit">
                Add Card
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
      </div>
    );
  } else {
    return (
      <button className="card-add" onClick={() => setOpen(true)}>
        + Add new card
      </button>
    );
  }
}

export default AddCard;
