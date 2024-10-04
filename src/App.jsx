import React, { Component } from 'react';
import axios from 'axios'; // Importamos axios
import Entries from './Entries';
import Forma from './Forma';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    entries: [], // Entradas del diario
    editingIndex: null, // Guardará el índice de la entrada que se está editando
    editingEntry: null, // Guardará la entrada que se está editando
  };

    // Método para agregar una entrada
  handleSubmit = (entry) => {
    axios
      .post('http://127.0.0.1:5000/posteos', entry)
      .then((response) => {
        console.log('Entrada creada:', response.data.message);
        this.setState({ entries: [...this.state.entries, entry] });
      })
      .catch((error) => {
        console.error('Error creando la entrada:', error);
      });
  };

  // Método para editar una entrada
  handleEdit = (index) => {
    const entryToEdit = this.state.entries[index];
    this.setState({
      editingIndex: index, // Guardamos el índice de la entrada que estamos editando
      editingEntry: entryToEdit, // Guardamos la entrada que estamos editando
    });
  };

  // Método para actualizar una entrada existente (PUT)
  handleUpdate = (updatedEntry) => {
    const { editingIndex, entries } = this.state;

    axios
      .put(`http://127.0.0.1:5000/posteos/${editingIndex}`, updatedEntry)
      .then((response) => {
        console.log('Entrada actualizada:', response.data.message);
        const updatedEntries = entries.map((entry, index) =>
          index === editingIndex ? updatedEntry : entry
        );
        this.setState({
          entries: updatedEntries, // Actualizamos el estado con la entrada modificada
          editingIndex: null, // Limpiamos el índice de edición
          editingEntry: null, // Limpiamos la entrada de edición
        });
      })
      .catch((error) => {
        console.error('Error actualizando la entrada:', error);
      });
  };

  // Método para eliminar una entrada
  removeEntry = (index) => {
    const { entries } = this.state;

    axios
      .delete(`http://127.0.0.1:5000/posteos/${index}`)
      .then((response) => {
        console.log('Entrada eliminada:', response.data.message);
        this.setState({
          entries: entries.filter((entry, i) => i !== index),
        });
      })
      .catch((error) => {
        console.error('Error eliminando la entrada:', error);
      });
  };

  // Hacer la solicitud GET a la API cuando el componente se monta utilizando axios
  componentDidMount() {
    axios
      .get('http://127.0.0.1:5000/posteos')
      .then((response) => {
        this.setState({ entries: response.data.content });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // Renderizar el componente
  render() {
    const { entries, editingIndex, editingEntry } = this.state;

    return (
      <div>
        {/* Div con la imagen de fondo que se repite verticalmente */}
        <div
          className="bg-image"
          style={{
            backgroundImage: "url('https://img.freepik.com/foto-gratis/hoja-naturaleza-fondos-patron-ilustracion-planta-telon-fondo-diseno-abstracto-naturaleza-verde-vibrante-papel-tapiz-ilustracion-generativa-ai_188544-12680.jpg?w=740&t=st=1727366151~exp=1727366751~hmac=dc7dd464ba9253f2d31d7eaabc7761101e07db050a55677ee76db60516e28455')",
            backgroundRepeat: "repeat", // Repetir solo verticalmente
            //backgroundSize: "cover",      // Asegura que la imagen se ajuste bien en cada repetición
            minHeight: "100vh"            // Permite que el contenido ocupe el mínimo del 100% de la vista
          }}
        >
          {/* Contenido de la app */}
          <h1 className="display-5 text-white text-center fw-bold text-uppercase" style={{ paddingBottom: '40px', paddingTop: '40px' }}>
            My Journal App
          </h1>
          <div className="container text-center border border-3 rounded" style={{ padding: '50px' }}>
            <div className="row">
              <div className="col">
                <h2 className="text-white fw-bold">Today</h2>
                {/* Mostramos el formulario para agregar o editar */}
                {editingIndex === null ? (
                  <Forma handleSubmit={this.handleSubmit} />
                ) : (
                  <Forma handleSubmit={this.handleUpdate} entry={editingEntry} />
                )}
              </div>
              <div className="col-1"></div>
              <div className="col-7">
                {/* Mostramos las entradas */}
                <Entries
                  entryData={entries}
                  removeEntry={this.removeEntry}
                  editEntry={this.handleEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;