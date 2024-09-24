import React, { Component } from 'react';
import axios from 'axios'; // Importamos axios
import Entries from './Entries';
import Forma from './Forma';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    entries: [], // Inicializamos el estado con un array vacío
  };

  // Método para eliminar una entrada
  removeEntry = (index) => {
    const { entries } = this.state;
    const entryToDelete = entries[index];

    // Hacer la solicitud DELETE al backend
    axios
      .delete(`http://127.0.0.1:5000/posteos/${index}`)
      .then((response) => {
        console.log('Entrada eliminada:', response.data.message);
        // Actualizamos el estado después de eliminar la entrada
        this.setState({
          entries: entries.filter((entry, i) => i !== index),
        });
      })
      .catch((error) => {
        console.error('Error eliminando la entrada:', error);
      });
  };

  // Método para agregar una entrada
  handleSubmit = (entry) => {
    // Hacer la solicitud POST al backend
    axios
      .post('http://127.0.0.1:5000/posteos', entry)
      .then((response) => {
        console.log('Entrada creada:', response.data.message);
        // Actualizamos el estado con la nueva entrada
        this.setState({ entries: [...this.state.entries, entry] });
      })
      .catch((error) => {
        console.error('Error creando la entrada:', error);
      });
  };

  // Hacer la solicitud GET a la API cuando el componente se monta utilizando axios
  componentDidMount() {
    axios
      .get('http://127.0.0.1:5000/posteos') // URL de tu API en Flask
      .then((response) => {
        // Actualizamos el estado con los datos de la respuesta
        this.setState({ entries: response.data.content });
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Manejo de errores
      });
  }

  // Renderizar el componente
  render() {
    const { entries } = this.state;

    return (
      <div className="App container">
        <h1 style={{ paddingBottom: '30px', paddingTop: '10px' }}>My Journal App</h1>
        <Forma handleSubmit={this.handleSubmit} />
        <Entries entryData={entries} removeEntry={this.removeEntry} />
      </div>
    );
  }
}

export default App;
