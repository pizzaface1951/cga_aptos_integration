import React, { useEffect, useState } from 'react';
import UserDashboard from './UserDashboard';
import CreatorDashboard from './CreatorDashboard';
import UserDetailsComponent from './UserDetailsComponent';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    fetch(`http://localhost:8080/api/user?email=${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserDetails(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="h-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center">
        <Col className="h-100 d-flex align-items-center justify-content-center">
          {userDetails.role === 'USER' && <UserDashboard />}
          {userDetails.role === 'CREATOR' && <CreatorDashboard />}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
