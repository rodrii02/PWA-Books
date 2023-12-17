import logo from './logo.svg';
import './App.css';
import { Buscador } from './components/Buscador.js';

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Buscador de libros</h1>
        <img src={logo} className="App-logo" alt="logo" height= "90" width="90"/>
      </header>
      <main className='App-main'>
        <Buscador></Buscador>
      </main>
     
    </div>
  );
}

export default App;
