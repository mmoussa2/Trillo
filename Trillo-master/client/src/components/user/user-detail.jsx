import React, { Component } from 'react';
import { Mutation } from "react-apollo";

import { FETCH_BOARD } from '../../graphql/mutations';

import { GET_BOARD_USERS } from '../../graphql/queries';
import { Query } from "react-apollo";


import UpdateUser from  './update-board-user';

class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

  render() {
    return (
      <div>
        <UpdateUser userId={this.props.user.id} boardId={this.props.boardId} />
        {this.props.user.name}
      </div>
    );
  }
}

export default UserDetail;