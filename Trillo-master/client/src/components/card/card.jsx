
import React from 'react';
import CardList from './card-list';
import AddCard from './new-card';
import './card-css/card.css'


function Card(props)  {

    
      return (
            <div className="card-container">
                <div className="all-cards">
                    <CardList cards={props.cards} listId={props.listId} />
                </div>
                <div className="add-card">
                    <AddCard listId={props.listId} />
                </div>
            </div>
        )
 }


export default Card;