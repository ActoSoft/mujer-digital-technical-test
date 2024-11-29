import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import OrderForm from './orderForm'; // Importa el formulario existente

const OrderList = () => {
  const [orders, setOrders] = useState([]); // Lista de pedidos
  const [selectedOrder, setSelectedOrder] = useState(null); // Pedido seleccionado
  const [editing, setEditing] = useState(false); // Estado para saber si estamos editando
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para recuperar los pedidos desde Firestore
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error al recuperar los pedidos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Llama a fetchOrders al cargar el componente
  useEffect(() => {
    fetchOrders();
  }, []);

  // Función para manejar clic en un pedido
  const handleSelectOrder = (order) => {
    setSelectedOrder(order); // Establece el pedido seleccionado
  };

  // Función para eliminar un pedido
  const handleDeleteOrder = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este pedido?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'orders', id));
        alert('Pedido eliminado exitosamente.');
        setOrders(orders.filter(order => order.id !== id)); // Actualiza la lista localmente
        setSelectedOrder(null); // Limpia el detalle si el pedido estaba seleccionado
      } catch (error) {
        console.error("Error al eliminar el pedido:", error.message);
      }
    }
  };

  // Función para manejar clic en Update
  const handleUpdateOrder = () => {
    setEditing(true); // Cambia al modo de edición
  };

  // Función para manejar la actualización del pedido
  const handleSubmitUpdatedOrder = async (updatedOrder) => {
    try {
      await updateDoc(doc(db, 'orders', updatedOrder.id), updatedOrder);
      alert('Pedido actualizado exitosamente.');
      setEditing(false); // Salir del modo de edición
      setSelectedOrder(null); // Regresa a la lista
      fetchOrders(); // Actualiza la lista
    } catch (error) {
      console.error("Error al actualizar el pedido:", error.message);
    }
  };

  // Renderizado condicional
  if (loading) {
    return <p>Cargando pedidos...</p>;
  }

  return (
    <div>
      <h2>Pedidos existentes</h2>

      {!selectedOrder && !editing ? (
        // Lista de pedidos
        orders.length > 0 ? (
          <ul>
            {orders.map(order => (
              <li key={order.id} style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => handleSelectOrder(order)}>
                <p><strong>Nombre del cliente:</strong> {order.customerName}</p>
                <p><strong>Número de artículos:</strong> {order.items.length}</p>
                <p><strong>Total:</strong> ${order.total}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay pedidos registrados.</p>
        )
      ) : selectedOrder && !editing ? (
        // Detalle del pedido seleccionado
        <div>
          <h3>Detalle del Pedido</h3>
          <p><strong>Nombre del cliente:</strong> {selectedOrder.customerName}</p>
          <p><strong>Artículos:</strong> {selectedOrder.items.join(', ')}</p>
          <p><strong>Total:</strong> ${selectedOrder.total}</p>
          <p><strong>Modalidad:</strong> {selectedOrder.modality}</p>
          <p><strong>Creado en:</strong> {selectedOrder.createdAt?.toDate().toLocaleString()}</p>
          <p><strong>Actualizado en:</strong> {selectedOrder.updatedAt?.toDate().toLocaleString()}</p>

          {/* Botones de acción */}
          <button onClick={handleUpdateOrder} style={{ marginRight: '10px' }}>Update</button>
          <button onClick={() => handleDeleteOrder(selectedOrder.id)}>Delete</button>
          <button onClick={() => setSelectedOrder(null)} style={{ marginTop: '20px' }}>
            Volver a la lista
          </button>
        </div>
      ) : (
        // Modo de edición
        <OrderForm
          initialData={selectedOrder} // Enviar los datos existentes al formulario
          onSubmit={handleSubmitUpdatedOrder} // Llama a la función para guardar los cambios
          onCancel={() => {
            setEditing(false);
            setSelectedOrder(null); // Regresa al detalle si se cancela
          }}
        />
      )}
    </div>
  );
};

export default OrderList;
