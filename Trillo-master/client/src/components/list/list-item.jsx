import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LIST_CARDS } from '../../graphql/queries';
import { UPDATE_LIST } from '../../graphql/mutations';
import DeleteList from './delete-list';
import Loading from '../loading/loading';
import './list.css';
import Card from '../card/card';

// List component takes in listId as a prop

function ListItem(props) {
  const [updateList] = useMutation(UPDATE_LIST);
  const { loading, data } = useQuery(GET_LIST_CARDS, {
    variables: { listId: props.listId },
  });

  function handleChange(e) {
    e.preventDefault();
    updateList({ variables: { id: props.listId, title: e.target.value } });
  }

  if (loading) {
    return(
      <Loading/>
    )
  } else {
    return (
      <div className="list-item">
        <div className="list-item-header">
          
          <input
            className="list-item-title"
            type="text"
            defaultValue={data.list.title}
            onChange={e => handleChange(e)} 
          />
          <DeleteList listId={props.listId} boardId={props.boardId}/>
        </div>
        <div className="list-item-card">
            <Card cards={data.list.cards}  listId = {props.listId}/>
        </div>
      </div>
    )
  }
}

export default ListItem;