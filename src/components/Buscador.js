import React, {useState} from 'react';
import logo from '../logo.svg';
import { Libro } from './Libro';
import axios from 'axios';

export const Buscador = () => {

  const [libros, setLibros] = useState([]);
  const [inputText, setInputText] = useState(''); // Nuevo estado para el texto del input

  const buscarLibros = async() => {
    const nLibros = []
    try {
      const respuesta = await axios.get("https://www.googleapis.com/books/v1/volumes?", {
          params: {
              q: inputText,
              printType: "books",
              maxResults: "40",
              key: "AIzaSyDfGIisB2KQFt8n8Q2c1MxNikCtbiwJczg"
          }
      })

      if(respuesta.status === 200){ //si hay respuesta
        respuesta.data.items.forEach((libro) => {
          const urlImg = ""
          const nuevoLibro = (
            <Libro
              urlImg={libro.volumeInfo.readingModes.image ? libro.volumeInfo.imageLinks.smallThumbnail: logo}
              titulo={libro.volumeInfo.title}
              autor={libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}
              linkMasInfo={libro.volumeInfo.infoLink}
            />
          );
          console.log(urlImg)
          nLibros.push(nuevoLibro);
        });
      }
      
    } catch (error) {
      console.log(error)
    }
    setLibros(nLibros)
  }

  return (
    <div className='buscador-libros'>
      <div className='buscador'>
        <h1>Introduce el nombre del libro: </h1>
        <input type='text' placeholder='Escribe el titulo de un libro' value={inputText} onChange={(e) => setInputText(e.target.value)}></input>
        <button onClick={ e => buscarLibros()}> Buscar</button>
      </div>
      <div className='libros'>
        <ul>
          {
            libros.map ((libro, indice) => {
              return (<li key={indice}>
                {libro}
              </li>)
            })
          }
        </ul>
      </div>
    </div>
  )
}

