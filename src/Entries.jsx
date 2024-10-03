import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';

const EntryBody = (props) => {
  const lines = props.entryData.map((line, index) => {
    return (
      <Container  key={index} className="shadow p-3 mb-5 bg-white rounded" >
        <Row style={{ padding: '10px'}}>
          <Col>
            <h2>{line.title}</h2>
            <mark class="text-danger">{Date()}</mark>
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
    <div >
      <h2 class="fw-bold text-center text-white" >My Entries</h2>
      <div class="text-start" style={{ paddingBottom: '20px', paddingTop: '20px' }}>
        <EntryBody entryData={entryData} removeEntry={removeEntry} editEntry={editEntry} />
      </div>
    </div>
  );
};

export default Entries;