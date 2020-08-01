import React, { useState } from 'react'
import { Error } from './Error'

export const Formulario = () => {

  const [termino, setTermino] = useState('')
  const [error, setError] = useState(false)

  const buscarImagenes = (e) => {
    e.preventDefault()
    // validar
    if (termino.trim()==='') {
      setError(true)
      return
    }
    setError(false)
    // enviar el termino de busqueda hacia el componente principal


  }

  return (
    <form
      onSubmit={buscarImagenes}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input 
            type="text"
            className="form-control from-control-lg"
            placeholder="Busca una imagen. Ejemplo: café"
            onChange={e=>setTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input 
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error mensaje="Agrega una palabra para hacer la búsqueda" /> : null}
    </form>
  )
}
