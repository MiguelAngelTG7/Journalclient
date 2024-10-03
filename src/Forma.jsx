import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

class Forma extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      title: "",
      body: "",
    };

    this.state = props.entry ? props.entry : this.initialState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const { title, body } = this.state;

    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Enter title"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
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
            value={body}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button variant="danger" onClick={this.submitForm}>
          {this.props.entry ? 'Update' : 'Submit'}
        </Button>
      </Form>
    );
  }
}

export default Forma;