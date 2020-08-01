import React from 'react';
import { Formulario } from './components/Formulario';

function App() {
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="display-4 text-center mb-5">Buscador de imagenes</p>
        <Formulario />
      </div>
    </div>
  );
}

export default App;
