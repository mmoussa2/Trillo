import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { DELETE_USER_BOARD } from '../../graphql/mutations';
import { GET_USER_BOARDS } from '../../graphql/queries';

class  DeleteBoard extends Component{
  constructor(props){
    super(props);
    this.state={
      title: this.props.title ,
      message: ''
    }
  }

  updateCache(cache, { data }) {
    let user;
    const id = localStorage.getItem("id");
    
    try {
      user = cache.readQuery({ query: GET_USER_BOARDS, variables: { id } })
      
    } catch (err) {
      return;
    } 
    if (user) {
      cache.writeQuery({
        query: GET_USER_BOARDS,
        variables: { id },
        data:{user: data.deleteUserBoard}
      });
    }
  }

  render(){
  return (
    <Mutation mutation={DELETE_USER_BOARD}
      onError={err => this.setState({ message: err.message })}
      update={(cache, data) => this.updateCache(cache, data)}
      >
      {(deleteBoard,{ data }) =>(
        <a onClick ={ e => {
          
          e.preventDefault();
          deleteBoard({ variables: { userId: localStorage.getItem("id"), boardId: this.props.id }});
        }}
        >
          <div className="deleteBtn tooltip">X
            <span className="tooltiptext">delete</span>
          </div>
        </a>
      )}
    </Mutation>
  );
  }
};

export default DeleteBoard;