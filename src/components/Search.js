import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = ({handleSubmit, handleChange}) => {
  return (
    <Fragment>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={handleChange}
        />
        <Button type='submit' variant="outline-success">Search</Button>
      </Form>
    </Fragment>
  )
}

export default Search