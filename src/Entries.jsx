import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';

const EntryHeader = () => {
  return <h3>Title</h3>;
};

const EntryBody = (props) => {
  const lines = props.entryData.map((line, index) => {
    return (
      <Container key={index} className="shadow p-3 mb-5 bg-white rounded">
        <Row>
          <Col>
            <h2>{line.title}</h2>
            <small>{Date()}</small>
            <p>{line.body}</p>
            <Button
              variant="primary"
              className="shadow"
              onClick={() => props.editEntry(index)}
            >
              Edit
            </Button>{' '}
            <Button
              variant="danger"
              className="shadow"
              onClick={() => props.removeEntry(index)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    );
  });

  return <div>{lines}</div>;
};

const Entries = (props) => {
  const { entryData, removeEntry, editEntry } = props;

  return (
    <div>
      <h2 style={{ paddingTop: '20px', paddingBottom: '20px' }}>My Entries</h2>
      <EntryHeader />
      <EntryBody entryData={entryData} removeEntry={removeEntry} editEntry={editEntry} />
    </div>
  );
};

export default Entries;
