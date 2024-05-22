import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setContacts(response.data);
        setFilteredContacts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the contacts!", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  return (
    <Container>
      <h1 className="mt-4">Contacts</h1>
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search by name, email, phone, or company"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr key={contact.id}>
              <td>
                <Link to={`/contact/${contact.id}`} className="contact-link">
                  {contact.name}
                </Link>
              </td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.company.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Contacts;
