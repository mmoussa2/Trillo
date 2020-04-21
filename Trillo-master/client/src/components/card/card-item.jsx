import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";

import { FETCH_CARD } from "../../graphql/queries";

import CardItemDetail from "./card-item-detail";
import DeleteCard from "./delete-card";

class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    this.setState({
      editing: true,
    });
    return (
      <CardItemDetail
        key={this.props.key}
        title={this.props.title}
        description={this.props.description}
        state={this.state.editing}
      />
    );
  }

  render() {
    const cardId = this.props.id;
    return (
      <Query query={FETCH_CARD} variables={{ id: cardId }}>
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading....</h1>;

          return (
            <div className="card-item" onClick={this.handleCardClick}>
              <div className="card-header">
                <div className="card-title"> {this.props.title}</div>
                <div>
                  <DeleteCard cardId={cardId} listId={this.props.listId} />{" "}
                </div>
              </div>
              <div className="card-description">{this.props.description}</div>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default CardItem;
