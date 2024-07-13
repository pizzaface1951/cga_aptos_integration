import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const CreatorDashboard = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [unityAssetRef, setUnityAssetRef] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/api/unity-asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tokenAddress, unityAssetRef })
      });

      if (response.ok) {
        setMessage('Unity Asset added successfully!');
      } else {
        setMessage('Failed to add Unity Asset. Please try again.');
      }
    } catch (error) {
      console.error('Error adding Unity Asset:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container fluid className="h-100 d-flex justify-content-center align-items-center creator-dashboard-container">
      <Row className="w-100 h-100">
        <Col xs={12} className="d-flex justify-content-center align-items-center">
          <Card className="w-50 creator-dashboard-card">
            <Card.Body>
              <h3 className="mb-3">Add Unity Asset</h3>
              {message && <Alert variant="info">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Token Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Token Address"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Unity Asset Reference</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Unity Asset Reference"
                    value={unityAssetRef}
                    onChange={(e) => setUnityAssetRef(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add Unity Asset
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatorDashboard;
