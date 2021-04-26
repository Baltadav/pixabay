import React, {useEffect, useState} from 'react'
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //state de la app

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect (()=>{
    const consultarAPI = async () =>{
      if(busqueda === '') return;
  
      const imagenesPorPagina = 30;
      const key ='21023444-a6f6257f0782fdd86efc6000d';
      const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);  
      
      //Calcular total paginas
      const calcularTotalPaginas= Math.ceil(resultado.totalHits / imagenesPorPagina);

      guardarTotalPaginas(calcularTotalPaginas);

      //mover pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    consultarAPI();
  },[busqueda,paginaactual])

  //definir la pagina anterior
  const paginaAnterior = ()=>{
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual ===0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //definir la pagina siguiente
  const paginaSiguiente = ()=>{
    const nuevaPaginaActual = paginaactual + 1;
    
    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className= "lead text-center">Buscador de imagenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className='row justify-content-center'>
        <ListadoImagenes
          imagenes = {imagenes}
        />

        {(paginaactual) === 1 
          ?null
          :<button
          type='button'
          className='bbtn btn-info mr-1'
          onClick = {paginaAnterior}
          >&laquo; Anterior</button>
        }
        
        {(paginaactual) === totalpaginas
          ?null
          :<button
          type='button'
          className='bbtn btn-info'
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;
