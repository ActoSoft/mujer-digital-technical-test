import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import OrderForm from './orderForm';
import OrderList from './OrderList'; // Importacion del componente

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        <h1>Bienvenido al Restaurante</h1>
        <p>Por favor, realiza tu pedido a continuación:</p>
        
        <OrderForm /> {/* Componente del formulario de pedidos */}

        <h2>Pedidos registrados:</h2>
        <OrderList /> {/* Componente para mostrar los pedidos */}

        <footer>Gracias por visitarnos</footer>
      </div>
    </>
  );
}

export default App;
