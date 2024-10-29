import React, { useState } from 'react';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState('');
  const [modality, setModality] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (customerName  items.length === 0  total) {
      alert("Por favor, complete todos los campos y seleccione al menos un artículo.");
      return;
    }

    const orderData = {
      customerName,
      items,
      total: parseFloat(total),
      modality,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Aquí puedes llamar a Firebase para guardar el pedido
    console.log("Pedido creado:", orderData);
    alert("Pedido creado exitosamente");
  };

  const handleItemChange = (event) => {
    const value = event.target.value;
    setItems(prevItems => 
      event.target.checked ? [...prevItems, value] : prevItems.filter(item => item !== value)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del cliente:
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
      </label>

      <p>Seleccione los elementos del menú:</p>
      <label><input type="checkbox" value="Hamburguesa simple" onChange={handleItemChange} /> Hamburguesa simple</label><br />
      <label><input type="checkbox" value="Hot dog" onChange={handleItemChange} /> Hot dog</label><br />
      <label><input type="checkbox" value="Hamburguesa doble" onChange={handleItemChange} /> Hamburguesa doble</label><br />
      <label><input type="checkbox" value="Papas fritas frescas" onChange={handleItemChange} /> Papas fritas frescas</label><br />
      <label><input type="checkbox" value="Soda" onChange={handleItemChange} /> Soda</label><br />

      <label>
        Importe total:
        <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} required />
      </label>

      <p>Recogida o Entrega:</p>
      <label><input type="radio" name="modality" value="pickup" onChange={(e) => setModality(e.target.value)} required /> Recogida</label>
      <label><input type="radio" name="modality" value="delivery" onChange={(e) => setModality(e.target.value)} required /> Entrega</label><br />

      <button type="submit">Enviar</button>
    </form>
  );
};

export default OrderForm;