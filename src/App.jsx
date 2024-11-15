import React, { useState } from 'react';
import { Layout, message } from 'antd';
import OrderForm from './components/OrderForm'; // Componente para crear o editar una orden
import OrderList from './components/OrderList'; // Componente para listar las órdenes
import Dashboard from './components/Dashboard'; // Componente principal del dashboard

const { Content } = Layout;

const App = () => {
  // Estado para almacenar las órdenes creadas
  const [orders, setOrders] = useState([]);
  
  // Estado para manejar la orden seleccionada cuando se ve el detalle de una orden
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // Estado para rastrear la vista actual del menú ("dashboard", "createOrder", "orderList", etc.)
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Función para agregar una nueva orden al estado y redirigir al dashboard
  const createOrder = (newOrder) => {
    const newOrderWithDates = {
      ...newOrder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders([...orders, newOrderWithDates]); // Agrega la nueva orden al estado
    message.success('Orden creada con éxito!'); // Muestra un mensaje de éxito
    setActiveMenu('dashboard'); 
  };

  // Función para actualizar una orden existente
  const editOrder = (updatedOrder) => {
    const updatedOrderWithDates = {
      ...updatedOrder,
      updatedAt: new Date().toISOString(), // Actualizamos la fecha de modificación
    };
    setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrderWithDates : order));
    message.success('Orden actualizada con éxito!');
    setActiveMenu('dashboard'); // Regresa al dashboard después de editar
  };

  // Función para eliminar una orden
  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    message.success('Orden eliminada con éxito!');
  };

  // Función para manejar la acción de "Crear Orden"
  const handleCreateOrderClick = () => {
    setActiveMenu('createOrder'); 
    setCurrentOrder(null); // Resetea el estado de la orden actual para crear una nueva
  };

  // Función para manejar la acción de "Ver Órdenes"
  const handleViewOrdersClick = () => {
    setActiveMenu('orderList'); 
  };

  // Función para manejar la acción de "Editar Orden"
  const handleEditOrder = (order) => {
    setCurrentOrder(order); // Establece la orden seleccionada para editar
    setActiveMenu('createOrder'); 
  };

  // Función para manejar el regreso al Dashboard
  const handleBackToDashboard = () => {
    setActiveMenu('dashboard');
  };

  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        {/* Vista del dashboard */}
        {activeMenu === 'dashboard' && (
          <Dashboard 
            onCreateOrder={handleCreateOrderClick} 
            onViewOrders={handleViewOrdersClick}
          />
        )}
        
        {/* Vista para crear o editar una orden */}
        {activeMenu === 'createOrder' && (
          <OrderForm 
            createOrder={createOrder} 
            editOrder={editOrder}
            order={currentOrder} // Pasa la orden seleccionada para editar
            redirectToDashboard={handleBackToDashboard} // Función para redirigir al dashboard
          />
        )}
        
        {/* Vista de la lista de órdenes */}
        {activeMenu === 'orderList' && (
          <OrderList 
            orders={orders} 
            showOrderDetails={handleEditOrder} // Pasa la función para editar la orden
            deleteOrder={deleteOrder} // Pasa la función para eliminar la orden
            onBackToDashboard={handleBackToDashboard} // Pasa la función para regresar al Dashboard
          />
        )}
      </Content>
    </Layout>
  );
};

export default App;