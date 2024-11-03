import React from 'react'
import './App.css'
import {Formulario,Titulo, ContenedorBoton, Boton, MensajeExito,
  MensajeError, LeyendaError, Multiple, MensajeTotal, Seleccion, Blanco, Label} from './formulario.js'
import {db} from './util/firebase'
function App() {
 
  async function  submmit  () {
    const orderCollection = collection(db, "orders");
      await addDoc(orderCollection, data);
  }

  return (
    <>
    
      <main>
        <Formulario action="">  
      <Titulo>CREAR PEDIDO</Titulo>
         
    <div>
      <Label htmlFor="nombre">Nombre</Label>
      <input type='text' placeholder='nombre'></input>
      </div>

      <Multiple>
     <Seleccion>Selecciona tus platillos: </Seleccion>
      <select
        name="seleccionaPlatillos"
        defaultValue={['Hamburguesa Simple', 'Soda']}
        multiple={true}
      >
        <option value="HamburguesaSimp">Hamburguesa Simple</option>
        <option value="Soda">Soda</option>
        <option value="Hot dog">Hot dog</option>
      </select>
       
      </Multiple>
          
          <LeyendaError>Error escoge una opción</LeyendaError>



          <MensajeTotal>
        <Seleccion htmlFor='totalAmount'>Total a pagar</Seleccion>
        <Blanco type='number' id='totalAmount'/>
        </MensajeTotal>
        <Multiple>
        <Seleccion htmlFor='deliveryOption'>Elige una opción de entrega</Seleccion>
        <select name='deliveryOption' id='deliveryOption'>
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select>
        </Multiple>

       { false && <MensajeError>
          <p> 
            <b>ERROR:</b> Por favor rellena el formulario correctamente. </p>
        </MensajeError>}
        <ContenedorBoton>
           <Boton type='submit'>Enviar</Boton>
           <MensajeExito>Formulario enviado exitosamente</MensajeExito>
        </ContenedorBoton>
        </Formulario>
        </main>
     
    </>
  )
}




   
export default App

