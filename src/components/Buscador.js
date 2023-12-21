import React from 'react';
import logo from '../logo.svg';
import { Libro } from './Libro';
import axios from 'axios';
import {useLocalStorage} from './useLocalStorage'

export const Buscador = () => {

  const [libros, setLibros] = useLocalStorage('libros', []);
  const [inputText, setInputText] = useLocalStorage('tituloLibro', ''); // Nuevo estado para el texto del input

  const buscarLibros = async() => {

    if (inputText.trim() === '') {
      // Mostrar un mensaje de alerta si el campo está vacío
      window.alert('Por favor, ingresa el título de un libro antes de buscar.');
      return; // Salir de la función si el campo está vacío
    }

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
          const nuevoLibro = (
            <Libro
              urlImg={libro.volumeInfo.readingModes.image ? libro.volumeInfo.imageLinks.smallThumbnail: logo}
              titulo={libro.volumeInfo.title}
              autor={libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}
              linkMasInfo={libro.volumeInfo.infoLink}
            />
          );
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

