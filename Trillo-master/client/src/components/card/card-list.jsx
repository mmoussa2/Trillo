
import React from 'react';
import Query from 'react-apollo';

import CardItem from './card-item';

function CardList(props){

   return (
       <div>
          {props.cards.map( card =>(
              <div className="card-item">
                    <CardItem id={card.id} title={card.title} description={card.description} listId={props.listId} />
              </div>
          ))}

       </div>
   )
 }

export default CardList;