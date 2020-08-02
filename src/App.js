import React, { useState, useEffect } from 'react';
import { Formulario } from './components/Formulario';

function App() {

  // state de la app
  const [busqueda, setBusqueda] = useState('')

  useEffect(()=>{
    const consultarAPI= async()=>{
      // al cargar el componenete la primera vez va a tratar de hacer la busqueda
      // con este if hacemos que no haga nada
      if (busqueda==='') {
        return
      }

      const imagenesPorPagina= 30
      const key='AQui-VA-LA-APIKEY'
      const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`
    
      const respuesta = await fetch(url)

      const resultado = await respuesta.json()

      setBusqueda(resultado.hits)

    }
    consultarAPI()
  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="display-4 text-center mb-5">Buscador de imagenes</p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>
    </div>
  );
}

export default App;
