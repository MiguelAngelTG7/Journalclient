import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';

const EntryBody = (props) => {
  const lines = props.entryData.map((line, index) => {
    // Formatear la fecha actual
    const date = new Date();
    const day = date.toLocaleDateString();  // Día en formato simple
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  // Hora en formato simple (solo horas y minutos)

    return (
      <Container key={index} className="shadow p-3 mb-5 bg-white rounded">
        <Row style={{ padding: '10px' }}>
          <Col>
            <h2>{line.title}</h2>
            <mark className="text-danger">{`${day}, ${time}`}</mark>  {/* Mostrar fecha en formato simple */}
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
      <h2 className="fw-bold text-center text-white">My Entries</h2>
      <div className="text-start" style={{ paddingBottom: '20px', paddingTop: '20px' }}>
        <EntryBody entryData={entryData} removeEntry={removeEntry} editEntry={editEntry} />
      </div>
    </div>
  );
};

export default Entries;