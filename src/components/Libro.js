import React from 'react'

export const Libro = ({urlImg, titulo, autor, linkMasInfo}) => {

  return (
    <div className='libro'>
        <img src={urlImg} alt='img'/>
        <div className='infoLibro'>
          <h3>Titulo libro: {titulo}</h3>
          <h3>Autor libro: {autor}</h3>
          <a href={linkMasInfo} target="_blank" rel="noopener noreferrer">Más información del libro</a>
        </div>
    </div>
  )
}
