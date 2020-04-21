import React, { Component } from 'react';
import { Query } from "react-apollo";
import { FETCH_BOARD } from '../../graphql/queries';
import List from '../list/list';
import NavBar from '../nav/nav_bar';
import User from '../user/user'
import Loading from '../loading/loading';

class BoardDetail extends Component{
  
  render() {
    const boardId = this.props.match.params.boardId
    return(
      <Query 
      query={FETCH_BOARD}
      variables={{ id: boardId}}
      >
        {({loading, error, data})=>{
          if(loading) return <Loading/>;
          return(
            <div className="board-detail">
              <NavBar/>
              <ul>
                 <User boardId={boardId} users={data.board.users} />
              </ul>
              <div>
                <List
                  lists={data.board.lists}
                  boardId={boardId}
                />
              </div>
             
            </div>
          );
        }}
      </Query>
    );
  }
}

export default BoardDetail;