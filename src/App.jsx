import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Entries from './Entries';
import Forma from './Forma';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'mikicho.junior@gmail.com' && password === '1347') {
      setIsAuthenticated(true);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');       // Limpiar el correo
    setPassword('');    // Limpiar la contraseña
  };

  const handleSubmit = (entry) => {
    axios
      .post('http://127.0.0.1:5000/posteos', entry)
      .then((response) => {
        console.log('Entrada creada:', response.data.message);
        const newEntry = response.data.content;
        setEntries([...entries, newEntry]);
      })
      .catch((error) => {
        console.error('Error creando la entrada:', error);
      });
  };

  const handleEdit = (index) => {
    const entryToEdit = entries[index];
    setEditingIndex(index);
    setEditingEntry(entryToEdit);
  };

  const handleUpdate = (updatedEntry) => {
    axios
      .put(`http://127.0.0.1:5000/posteos/${editingEntry.id}`, updatedEntry)
      .then((response) => {
        console.log('Entrada actualizada:', response.data.message);
        const updatedEntries = entries.map((entry) =>
          entry.id === editingEntry.id ? { ...entry, ...updatedEntry } : entry
        );
        setEntries(updatedEntries);
        setEditingIndex(null);
        setEditingEntry(null);
      })
      .catch((error) => {
        console.error('Error actualizando la entrada:', error);
      });
  };

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

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/posteos')
      .then((response) => {
        setEntries(response.data.content);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div className="bg-image" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/solid-navy-blue-concrete-textured-wall_53876-124584.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1728864000&semt=ais_hybrid-rr-similar')", backgroundRepeat: "repeat", minHeight: "100vh" }}>
          <h1 className="display-5 text-white text-center fw-bold text-uppercase" style={{ paddingBottom: '40px', paddingTop: '40px' }}>My Journal App</h1>
          
          {/* Botón de Cerrar Sesión */}
          <div className="text-end me-5">
            <button className="btn btn-danger" onClick={handleLogout}>Salir</button>
            <br /> <br />
          </div>

          <div className="container text-center border border-3 rounded" style={{ padding: '50px' }}>
            <div className="row">
              <div className="col">
                <h2 className="text-white fw-bold">Today</h2>
                {editingIndex === null ? (
                  <Forma handleSubmit={handleSubmit} />
                ) : (
                  <Forma handleSubmit={handleUpdate} entry={editingEntry} />
                )}
              </div>
              <div className="col-1"></div>
              <div className="col-7">
                <Entries entryData={entries} removeEntry={removeEntry} editEntry={handleEdit} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-container text-center" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
          <form onSubmit={handleLogin} style={{ width: "300px", padding: "20px", background: "white", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
            <h2 className="mb-4">Iniciar Sesión</h2>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
