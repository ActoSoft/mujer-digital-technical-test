import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

const OrderForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [customerName, setCustomerName] = useState(initialData?.customerName || '');
  const [selectedItems, setSelectedItems] = useState(initialData?.items || []);
  const [total, setTotal] = useState(initialData?.total || 0);
  const [modality, setModality] = useState(initialData?.modality || '');
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { name: 'Hamburguesa simple', price: 100 },
    { name: 'Hot dog', price: 70 },
    { name: 'Hamburguesa doble', price: 150 },
    { name: 'Papas fritas frescas', price: 80 },
    { name: 'Soda', price: 25 }
  ];

  // Calcula el total dinámicamente al cambiar los elementos seleccionados
  useEffect(() => {
    const totalAmount = selectedItems.reduce((sum, item) => {
      const menuItem = menuItems.find(menuItem => menuItem.name === item);
      return sum + (menuItem ? menuItem.price : 0);
    }, 0);
    setTotal(totalAmount);
  }, [selectedItems]);

  // Maneja la selección de elementos del menú
  const handleCheckboxChange = (itemName) => {
    setSelectedItems(prevItems =>
      prevItems.includes(itemName)
        ? prevItems.filter(item => item !== itemName)
        : [...prevItems, itemName]
    );
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || selectedItems.length === 0) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      if (initialData) {
        // Actualización de un pedido existente
        const docRef = doc(db, 'orders', initialData.id);
        await updateDoc(docRef, {
          customerName,
          items: selectedItems,
          total,
          modality,
          updatedAt: serverTimestamp()
        });
        alert('Pedido actualizado exitosamente.');
      } else {
        // Creación de un nuevo pedido
        await addDoc(collection(db, 'orders'), {
          customerName,
          items: selectedItems,
          total,
          modality,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        alert('Pedido enviado exitosamente.');
      }

      // Llama a la función de envío proporcionada
      if (onSubmit) {
        onSubmit({
          id: initialData?.id || null,
          customerName,
          items: selectedItems,
          total,
          modality
        });
      }

      // Limpia el formulario después de enviar
      setCustomerName('');
      setSelectedItems([]);
      setTotal(0);
      setModality('');
    } catch (error) {
      console.error("Error al enviar el pedido:", error.message);
    } finally {
      setLoading(false);
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

      <button type="submit" disabled={loading}>
        {loading ? 'Procesando...' : initialData ? 'Actualizar pedido' : 'Enviar pedido'}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default OrderForm;
