import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_BOARD_USERS } from '../../graphql/queries';
import UserDetail from './user-detail';

import UpdateUser from './update-board-user'

class User extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
       
      <div className="board-detail">
        {/* {this.props.users.map(user => (
          <li key={user.id}>
            <UserDetail user={user} boardId={this.props.boardId} />
          </li>
        ))} */}
      </div>
    
      // <Query
      //   query={GET_BOARD_USERS}
      //   variables={{ id: this.props.boardId }}
      // >
      //   {({ loading, error, data }) => {
      //     if (loading) return <h1>Loading...</h1>;
      //     debugger
      //     return (
      //       <div className="board-detail">

      //         {data.users.map(user => (
      //           <li key={user.id}>
      //             {/* {/* <UpdateUser userId={this.props.user.id} boardId={this.props.boardId} /> */}
      //             <UserDetail user={user} boardId={this.props.boardId} /> 
      //           </li>
      //         ))}
      //        </div>
      //     );
      //   }}
      // </Query>
    );
  }
}

export default User;