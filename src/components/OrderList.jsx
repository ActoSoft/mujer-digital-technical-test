import React, { useState } from 'react';
import { Button, Collapse, List, Typography, Divider, Space, Popconfirm, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 

const { Title, Text } = Typography;
const { Panel } = Collapse;

const OrderList = ({ orders, showOrderDetails, deleteOrder, onBackToDashboard }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // Filtrar órdenes según el nombre del cliente
  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* Botón para volver al Dashboard */}
      <Button 
        onClick={onBackToDashboard} 
        type="default" 
        style={{ marginBottom: '20px' }}
      >
        Volver al Dashboard
      </Button>

      {/* Campo de búsqueda para filtrar por nombre de cliente */}
      <Input
        placeholder="Buscar por nombre de cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        style={{ marginBottom: '20px', width: '300px' }}
      />

      {/* Título de la lista de órdenes */}
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Historial de Órdenes
      </Title>

      {/* Acordeón para mostrar cada orden */}
      <Collapse accordion>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <Panel header={`${order.customerName} - Total: $${order.total}`} key={index}>
              {/* Modalidad de la orden */}
              <Text strong>Modalidad:</Text> {order.modality === 'pickup' ? 'Pickup' : 'Delivery'}

              <Divider />

              {/* Lista de productos de la orden */}
              <List
                dataSource={order.items}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={`Cantidad: ${item.quantity} | Precio: $${item.price}`}
                    />
                    <Text strong>Total: ${item.quantity * item.price}</Text>
                  </List.Item>
                )}
              />

              <Divider />

              {/* Total de la orden */}
              <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Total: ${order.total}</Text>

              {/* Fechas de creación y actualización */}
              <Divider />
              <Text type="secondary">Creada el: {new Date(order.createdAt).toLocaleString()}</Text>
              {order.updatedAt !== order.createdAt && (
                <Text type="secondary" style={{ marginLeft: '10px' }}>
                  Actualizada el: {new Date(order.updatedAt).toLocaleString()}
                </Text>
              )}

              <Divider />

              {/* Botones de acciones: Editar y Eliminar */}
              <Space>
                {/* Botón para editar la orden */}
                <Button 
                  onClick={() => showOrderDetails(order)} 
                  type="primary" 
                  icon={<EditOutlined />} 
                >
                  Editar
                </Button>

                {/* Botón de eliminar orden */}
                <Popconfirm
                  title="¿Estás seguro de que deseas eliminar esta orden?"
                  onConfirm={() => deleteOrder(order.id)} // Llama a la función deleteOrder con el ID de la orden
                  okText="Sí"
                  cancelText="No"
                >
                  <Button 
                    danger 
                    icon={<DeleteOutlined />} 
                  >
                    Eliminar
                  </Button>
                </Popconfirm>
              </Space>
            </Panel>
          ))
        ) : (
          <Text>No se encontraron órdenes para ese cliente.</Text> 
        )}
      </Collapse>
    </div>
  );
};

export default OrderList;