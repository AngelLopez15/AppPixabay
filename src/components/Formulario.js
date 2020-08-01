import React, { useState } from 'react'

export const Formulario = () => {

  const [termino, setTermino] = useState('')

  const buscarImagenes = (e) => {
    e.preventDefault()
    // validar

    // enviar el termino a buscar
    
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
    </form>
  )
}
