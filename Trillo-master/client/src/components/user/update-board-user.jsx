import React, { Component } from 'react';
import { Mutation } from "react-apollo";

import { UPDATE_USER_BOARD } from '../../graphql/mutations';

import { GET_BOARD_USERS } from '../../graphql/queries';
import { FETCH_BOARD } from '../../graphql/queries';

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

  updateCache(cache, { data }) {
    let result;
    
  
    try {
      result = cache.readQuery({ query: FETCH_BOARD , variables:{id: this.props.boardId}})
    } catch (err) {
      return err;
    }
    if (result) {
      
      let userArray = (Object.assign(result.board.users));
      
      cache.writeQuery({
        query: FETCH_BOARD,
        variables: { id: this.props.boardId },
        data: { users: userArray.filter(item => item.id !== this.props.userId) }
      });
    }
  }

  render() {

    return (
      <Mutation mutation={UPDATE_USER_BOARD}
        onError={err => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        
        {(updateUserBoard, { data }) => ( 
          <a onClick={e => {
            e.preventDefault();
            updateUserBoard({ variables: { 
              userId: this.props.userId,
              boardId:this.props.boardId
              } 
            });
          }}
          >
            <p>x</p>
          </a>
        )}
      </Mutation>
    );
  }
}

export default UpdateUser;