import React from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const Zutaten = ({zutaten}) => {
  const result = zutaten.map((zutat, index) => {
    return (
      <ListGroupItem key={index}>
        <div className="d-flex flex-row justify-content-between">
          <div>{zutat.zutat}</div>
          <div>{zutat.menge}</div>
        </div>
      </ListGroupItem>
    )
  })
  return result;
}

export default Zutaten