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
      const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`
    
      const respuesta = await fetch(url)

      const resultado = await respuesta.json()

      setImagenes(resultado.hits)

      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina)

      setTotalPaginas(calcularTotalPaginas)

      // Mover la pantalla hacia arriba
      const jumbotron= document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior:'smooth'})
      
    }
    consultarAPI()
  }, [busqueda,paginaActual])

  // definir la pagina anterior
  const paginaAnterior=()=>{
    const nuevaPaginaActual=paginaActual-1
    if (nuevaPaginaActual===0) {
      return
    }
    setPaginaActual(nuevaPaginaActual)
  }

  // definir la pagina siguiente
  const paginaSiguiente=()=>{
    const nuevaPaginaActual=paginaActual+1
    if (nuevaPaginaActual>totalPaginas) {
      return
    }
    setPaginaActual(nuevaPaginaActual)
  }

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

      {(paginaActual===1)? null : (
      <button
        type="button"
        className="btn btn-info mr-1"
        onClick={paginaAnterior}
        >
        &laquo; Anterior
        </button>
      )}
      
      {(paginaActual===totalPaginas) ? null : (
        <button
        type="button"
        className="btn btn-info"
        onClick={paginaSiguiente}
        >
        Siguiente &raquo;
        </button>
      )}
    </div>
  );
}

export default App;
