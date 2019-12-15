import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import './css/Home.css'

class Home extends Component {
  

  render() {
    return (
      <Container>
        <Row><div></div></Row>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Jumbotron>
              <h2>Home</h2>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    )
  }
};

export default Home;