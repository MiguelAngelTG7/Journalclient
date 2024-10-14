import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';

// Función para formatear fecha y hora en formato legible
const formatDateTime = (dateTimeString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleDateString('en-US', options);
};

const EntryBody = ({ entryData, removeEntry, editEntry }) => {
  return entryData.map((line, index) => (
    <Container key={index} className="shadow p-3 mb-5 bg-white rounded">
      <Row style={{ padding: '10px'}}>
        <Col>
          <h2>{line.title}</h2>
          <mark>Creado: {formatDateTime(line.created_at)}</mark><br/>
          <mark>Actualizado: {formatDateTime(line.updated_at)}</mark>
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
