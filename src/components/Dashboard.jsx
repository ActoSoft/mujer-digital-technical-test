import React from 'react';
import { Button, Col, Row } from 'antd';

const Dashboard = ({ onCreateOrder, onViewOrders }) => {
  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col>
        <h1 style={{ textAlign: 'center' }}>¡Bienvenidx!</h1>
        <Button 
          type="primary" 
          style={{ margin: '10px' }} 
          onClick={onCreateOrder}
        >
          Crear Orden
        </Button>
        <Button 
          type="default" 
          style={{ margin: '10px' }} 
          onClick={onViewOrders}
        >
          Historial de Órdenes
        </Button>
      </Col>
    </Row>
  );
};

export default Dashboard;