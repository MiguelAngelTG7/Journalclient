import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const Forma = ({ handleSubmit, entry }) => {
  const initialState = { title: '', body: '' };
  const [formState, setFormState] = useState(entry || initialState);

  useEffect(() => {
    if (entry) {
      setFormState(entry);
    }
  }, [entry]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const submitForm = () => {
    handleSubmit(formState);
    setFormState(initialState);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Enter title"
          type="text"
          name="title"
          id="title"
          value={formState.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Entry</Form.Label>
        <Form.Control
          placeholder="What's up?"
          as="textarea"
          rows={3}
          name="body"
          id="body"
          value={formState.body}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="danger" onClick={submitForm}>
        {entry ? 'Update' : 'Submit'}
      </Button>
    </Form>
  );
};

export default Forma;

