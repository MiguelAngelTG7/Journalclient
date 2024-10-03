import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';

const EntryBody = (props) => {
  const lines = props.entryData.map((line, index) => {
    // Verificar si line.date tiene un valor válido
    let date;
    if (line.date) {
      // Intentar crear el objeto Date con la fecha del posteo
      date = new Date(line.date);
      if (isNaN(date.getTime())) { // Comprobar si la fecha es válida
        date = new Date(); // Usar la fecha actual si hay un error
      }
    } else {
      date = new Date(); // Usar la fecha actual si no hay date
    }
    
    const day = date.toLocaleDateString(); // Día en formato simple
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Hora en formato simple (solo horas y minutos)

    return (
      <Container key={line.id} className="shadow p-3 mb-5 bg-white rounded">
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
