import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Entries from './Entries';
import Forma from './Forma';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [entries, setEntries] = useState([]);  // Para almacenar las entradas del diario
  const [editingIndex, setEditingIndex] = useState(null); // Índice de la entrada que se está editando
  const [editingEntry, setEditingEntry] = useState(null); // Entrada que se está editando

  // Método para agregar una entrada
  const handleSubmit = (entry) => {
    axios
      .post('http://127.0.0.1:5000/posteos', entry)
      .then((response) => {
        console.log('Entrada creada:', response.data.message);
        const newEntry = response.data.content;
        setEntries([...entries, newEntry]);  // Añadimos la nueva entrada al estado
      })
      .catch((error) => {
        console.error('Error creando la entrada:', error);
      });
  };

  // Método para editar una entrada
  const handleEdit = (index) => {
    const entryToEdit = entries[index];
    setEditingIndex(index); // Guardamos el índice de la entrada que estamos editando
    setEditingEntry(entryToEdit); // Guardamos la entrada que estamos editando
  };

  // Método para actualizar una entrada existente (PUT)
  const handleUpdate = (updatedEntry) => {
    axios
      .put(`http://127.0.0.1:5000/posteos/${editingIndex}`, updatedEntry)
      .then((response) => {
        console.log('Entrada actualizada:', response.data.message);
        const updatedEntries = entries.map((entry, index) =>
          index === editingIndex ? updatedEntry : entry
        );
        setEntries(updatedEntries);  // Actualizamos el estado con la entrada modificada
        setEditingIndex(null);  // Limpiamos el índice de edición
        setEditingEntry(null);  // Limpiamos la entrada de edición
      })
      .catch((error) => {
        console.error('Error actualizando la entrada:', error);
      });
  };

  // Método para eliminar una entrada
  const removeEntry = (index) => {
    const entryToRemove = entries[index];

    axios
      .delete(`http://127.0.0.1:5000/posteos/${entryToRemove.id}`)
      .then((response) => {
        console.log('Entrada eliminada:', response.data.message);
        setEntries(entries.filter((entry) => entry.id !== entryToRemove.id));
      })
      .catch((error) => {
        console.error('Error eliminando la entrada:', error);
      });
  };

  // useEffect para cargar las entradas cuando el componente se monta
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/posteos')
      .then((response) => {
        setEntries(response.data.content);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);  // El array vacío hace que este efecto se ejecute solo una vez cuando el componente se monta

  return (
    <div>
      <div
        className="bg-image"
        style={{
          backgroundImage: "url('https://img.freepik.com/foto-gratis/hoja-naturaleza-fondos-patron-ilustracion-planta-telon-fondo-diseno-abstracto-naturaleza-verde-vibrante-papel-tapiz-ilustracion-generativa-ai_188544-12680.jpg?w=740&t=st=1727366151~exp=1727366751~hmac=dc7dd464ba9253f2d31d7eaabc7761101e07db050a55677ee76db60516e28455')",
          backgroundRepeat: "repeat", 
          minHeight: "100vh"
        }}
      >
        <h1 className="display-5 text-white text-center fw-bold text-uppercase" style={{ paddingBottom: '40px', paddingTop: '40px' }}>
          My Journal App
        </h1>
        <div className="container text-center border border-3 rounded" style={{ padding: '50px' }}>
          <div className="row">
            <div className="col">
              <h2 className="text-white fw-bold">Today</h2>
              {/* Mostramos el formulario para agregar o editar */}
              {editingIndex === null ? (
                <Forma handleSubmit={handleSubmit} />
              ) : (
                <Forma handleSubmit={handleUpdate} entry={editingEntry} />
              )}
            </div>
            <div className="col-1"></div>
            <div className="col-7">
              {/* Mostramos las entradas */}
              <Entries entryData={entries} removeEntry={removeEntry} editEntry={handleEdit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
