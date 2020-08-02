import React, { useState, useEffect } from 'react';
import { Formulario } from './components/Formulario';
import { ListadoImagen } from './components/ListadoImagen';

function App() {

  // state de la app
  const [busqueda, setBusqueda] = useState('')

  const [imagenes, setImagenes] = useState([])

  // states para agregar el paginador
  const [paginaActual, setPaginaActual] = useState(1)

  const [totalPaginas, setTotalPaginas] = useState(1)


  useEffect(()=>{
    const consultarAPI= async()=>{
      // al cargar el componenete la primera vez va a tratar de hacer la busqueda
      // con este if hacemos que no haga nada
      if (busqueda==='') {
        return
      }

      const imagenesPorPagina= 30
      const key='AQui-VA-LA-APIKEY'
      // per_page es un parametro que nos da la API para poder decirle cuandotas imagenes queremos
      // que nos retorne por pagina. Siempre cuando se va a paginar hay que decirle a backend que 
      // nos de un endpoint que haga eso.
      const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`
    
      const respuesta = await fetch(url)

      const resultado = await respuesta.json()

      setImagenes(resultado.hits)

      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina)

      setTotalPaginas(calcularTotalPaginas)

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

      <div className="row justify-content-center">
        <ListadoImagen
          imagenes={imagenes}
        />
      </div>

    </div>
  );
}

export default App;
