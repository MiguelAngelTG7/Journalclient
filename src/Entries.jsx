import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';

const EntryBody = ({ entryData, removeEntry, editEntry }) => {
  return entryData.map((line, index) => (
    <Container key={index} className="shadow p-3 mb-5 bg-white rounded">
      <Row style={{ padding: '10px'}}>
        <Col>
          <h2>{line.title}</h2>
          <mark className="text-danger">{Date()}</mark>
          <p>{line.body}</p>
          <Button variant="primary" className="shadow" onClick={() => editEntry(index)}>Edit</Button>{' '}
          <Button variant="danger" className="shadow" onClick={() => removeEntry(index)}>Delete</Button>
        </Col>
      </Row>
    </Container>
  ));
};

const Entries = ({ entryData, removeEntry, editEntry }) => (
  <div>
    <h2 className="fw-bold text-center text-white">My Entries</h2>
    <div className="text-start" style={{ paddingBottom: '20px', paddingTop: '20px' }}>
      <EntryBody entryData={entryData} removeEntry={removeEntry} editEntry={editEntry} />
    </div>
  </div>
);

export default Entries;
