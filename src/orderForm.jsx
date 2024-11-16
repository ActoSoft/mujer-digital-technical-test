import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig'; 

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [modality, setModality] = useState('');

  // Precios de los elementos del menú
  const menuItems = [
    { name: 'Hamburguesa simple', price: 100 },
    { name: 'Hot dog', price: 70 },
    { name: 'Hamburguesa doble', price: 150 },
    { name: 'Papas fritas frescas', price: 80 },
    { name: 'Soda', price: 25 }
  ];

  // Calcula el total automáticamente cuando cambian los elementos seleccionados
  useEffect(() => {
    const totalAmount = selectedItems.reduce((sum, item) => {
      const menuItem = menuItems.find(menuItem => menuItem.name === item);
      return sum + (menuItem ? menuItem.price : 0);
    }, 0);
    setTotal(totalAmount);
  }, [selectedItems]);

  const handleCheckboxChange = (itemName) => {
    setSelectedItems(prevItems =>
      prevItems.includes(itemName)
        ? prevItems.filter(item => item !== itemName)
        : [...prevItems, itemName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!customerName || selectedItems.length === 0) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        customerName,
        items: selectedItems,
        total,
        modality,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      alert('Pedido enviado exitosamente');
      // Limpiar el formulario
      setCustomerName('');
      setSelectedItems([]);
      setTotal(0);
      setModality('');
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del cliente:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Selecciona los elementos del menú:</label>
        {menuItems.map((item) => (
          <label key={item.name}>
            <input
              type="checkbox"
              value={item.name}
              checked={selectedItems.includes(item.name)}
              onChange={() => handleCheckboxChange(item.name)}
            />
            {item.name} - ${item.price}
          </label>
        ))}
      </div>

      <div>
        <label>Importe total: ${total}</label>
      </div>

      <div>
        <label>Modalidad:</label>
        <label>
          <input
            type="radio"
            value="recogida"
            checked={modality === "recogida"}
            onChange={(e) => setModality(e.target.value)}
            required
          />
          Recogida
        </label>
        <label>
          <input
            type="radio"
            value="entrega"
            checked={modality === "entrega"}
            onChange={(e) => setModality(e.target.value)}
            required
          />
          Entrega
        </label>
      </div>

      <button type="submit">Enviar pedido</button>
    </form>
  );
};

export default OrderForm;
