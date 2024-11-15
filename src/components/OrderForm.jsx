import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Radio, message, Divider, Typography, Row, Col } from 'antd';
import './OrderForm.css';

const { Title } = Typography;

// Precios de los productos
const prices = {
  "Hamburguesa Sencilla": 50,
  "Hamburguesa Doble": 85,
  "Hotdog": 35,
  "Papas a la francesa": 30,
  "Refresco": 25,
};

const OrderForm = ({ createOrder, editOrder, order, redirectToDashboard }) => {
  const [form] = Form.useForm();
  const [quantities, setQuantities] = useState({
    "Hamburguesa Sencilla": 0,
    "Hamburguesa Doble": 0,
    "Hotdog": 0,
    "Papas a la francesa": 0,
    "Refresco": 0,
  });
  const [total, setTotal] = useState(0);

  // Efecto para cargar la orden cuando estamos editando
  useEffect(() => {
    if (order) {
      const initialQuantities = { ...quantities };
      order.items.forEach(item => {
        initialQuantities[item.name] = item.quantity;
      });
      setQuantities(initialQuantities);
      setTotal(order.total);

      form.setFieldsValue({
        customerName: order.customerName,
        modality: order.modality,
      });
    }
  }, [order, form]);

  // Función para manejar el cambio en la cantidad de un producto
  const onQuantityChange = (item, value) => {
    const newQuantities = {
      ...quantities,
      [item]: value >= 0 ? value : 0, // Evita valores negativos
    };
    setQuantities(newQuantities);
  };

  // Efecto para recalcular el total cuando cambian las cantidades
  useEffect(() => {
    let newTotal = 0;
    for (const item in quantities) {
      newTotal += quantities[item] * prices[item];
    }
    setTotal(newTotal);
  }, [quantities]);

  const onFinish = (values) => {
    if (!values.customerName || total === 0) {
      message.error('Por favor, ingresa el nombre del cliente y selecciona al menos un producto.');
      return;
    }

    const selectedItems = Object.keys(quantities).filter(item => quantities[item] > 0);

    const orderData = {
      id: order ? order.id : Date.now(),
      customerName: values.customerName,
      items: selectedItems.map(item => ({
        name: item,
        quantity: quantities[item],
        price: prices[item],
      })),
      total,
      modality: values.modality,
      createdAt: order ? order.createdAt : new Date().toLocaleString(),
    };

    if (order) {
      editOrder(orderData);
    } else {
      createOrder(orderData);
    }

    redirectToDashboard();
    form.resetFields();
    setQuantities({
      "Hamburguesa Sencilla": 0,
      "Hamburguesa Doble": 0,
      "Hotdog": 0,
      "Papas a la francesa": 0,
      "Refresco": 0,
    });
    setTotal(0);
  };

  return (
    <div className="form-container">
      <Title level={3} className="form-title">{order ? "Editar Orden" : "Nueva Orden"}</Title>
      <Form form={form} onFinish={onFinish} layout="vertical" className="order-form">

        {/* Campo para el nombre del cliente */}
        <Form.Item
          name="customerName"
          label="Nombre del cliente"
          rules={[{ required: true, message: 'Por favor, ingresa el nombre del cliente.' }]}
        >
          <Input placeholder="Cliente" />
        </Form.Item>

        <Divider>Menú</Divider>

        {/* Controles para sumar y restar items */}
        {Object.keys(prices).map((item) => (
          <Form.Item key={item} label={`${item} - $${prices[item]}`} style={{ marginBottom: '12px' }}>
            <Row gutter={12} align="center">
              <Col>
                <Button
                  type="default"
                  icon="-"
                  onClick={() => onQuantityChange(item, quantities[item] - 1)} // Resta la cantidad
                  disabled={quantities[item] === 0} // Deshabilita si la cantidad es 0
                  style={{ padding: '0 10px' }}
                >
                </Button>
              </Col>
              <Col span={4}>
                <Input
                  min={0}
                  value={quantities[item]}
                  onChange={(value) => onQuantityChange(item, value)} // Actualiza la cantidad
                  style={{ width: '100%' }}
                />
              </Col>
              <Col>
                <Button
                  type="default"
                  icon="+"
                  onClick={() => onQuantityChange(item, quantities[item] + 1)} // Aumenta la cantidad
                  style={{ padding: '0 10px' }}
                >
                </Button>
              </Col>
            </Row>
          </Form.Item>
        ))}

        {/* Total de la orden */}
        <Form.Item label="Total" style={{ marginBottom: '16px' }}>
          <InputNumber value={total} disabled style={{ width: '100%', fontWeight: 'bold' }} />
        </Form.Item>

        {/* Modalidad de la orden */}
        <Form.Item
          name="modality"
          label="Modalidad"
          rules={[{ required: true, message: 'Por favor, selecciona una modalidad.' }]}
        >
          <Radio.Group>
            <Radio.Button value="pickup">Pickup</Radio.Button>
            <Radio.Button value="delivery">Delivery</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Botón de envío */}
        <Form.Item style={{ marginTop: '24px' }}>
          <Button type="primary" htmlType="submit" block>
            {order ? 'Actualizar Orden' : 'Crear Orden'}
          </Button>
        </Form.Item>
      </Form>

      {/* Botón para volver al Dashboard */}
      <Button onClick={redirectToDashboard} block style={{ marginTop: '12px' }}>
        Volver al Dashboard
      </Button>
    </div>
  );
};

export default OrderForm;
