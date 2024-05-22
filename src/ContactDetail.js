import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactDetail.css';

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setContact(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the contact!", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading contact details...</p>;
  }

  if (!contact) {
    return <p>Contact not found</p>;
  }

  return (
    <Container className="mt-4">
      <Link to="/">
        <Button variant="primary" className="mb-4">Back to Contacts</Button>
      </Link>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Card.Title>{contact.name}</Card.Title>
              <Card.Text>
                <strong>Username:</strong> {contact.username} <br />
                <strong>Email:</strong> {contact.email} <br />
                <strong>Phone:</strong> {contact.phone} <br />
                <strong>Website:</strong> <a href={`http://${contact.website}`} target="_blank" rel="noreferrer">{contact.website}</a> <br />
                <strong>Company:</strong> {contact.company.name} <br />
              </Card.Text>
            </Col>
            <Col md={6}>
              <Card.Text>
                <strong>Address:</strong> <br />
                {contact.address.street}, {contact.address.suite} <br />
                {contact.address.city}, {contact.address.zipcode} <br />
                <strong>Geo:</strong> <br />
                Lat: {contact.address.geo.lat}, Lng: {contact.address.geo.lng}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactDetail;
