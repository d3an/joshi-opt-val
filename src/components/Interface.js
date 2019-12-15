import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import axios from 'axios';
import './css/Interface.css'

export default class OptionValuation extends Component {
  state = {
    daysToExp: 30,
    payoff: 0.0,
    riskFreeRate: 0.06,
    spot: 100,
    steps: 1000,
    strike: 100,
    type: 'call',
    volatility: 0.4,
  }

  handleChange = event => {
    const fieldName = event.target.id;
    const fieldVal = event.target.value;
    this.setState({
      [fieldName]: fieldVal
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.get(`https://montecarlo.monti.workers.dev/?type=${this.state.type}&dte=${this.state.daysToExp}&strike=${this.state.strike}&rf=${this.state.riskFreeRate}&spot=${this.state.spot}&vol=${this.state.volatility}&steps=${this.state.steps}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({'payoff': res.data});
      })
      .catch(err => {
        console.log(err)
        console.log("Potentially exceeded capacity limits...")
        console.log("Request with step count > 10000 is not consistent.")
        console.log("Try again with step count <= 10000")
      });
  }

  render() {
    return (
      <Container>
          <Col xs={12} md={12}>
            <Row>
              <Col xs={12} md={12}>
                <h1>Monte Carlo Option Valuation</h1>
                <p className='credits'>Developed by James Bury &amp; Mark Joshi</p>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={1}></Col>
              <Col xs={12} md={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group as={Row} controlId="type">
                    <Form.Label column sm="4">Type</Form.Label>
                    <Col sm="5">
                      <Form.Control as="select" onChange={this.handleChange.bind(this)}>
                        <option>call</option>
                        <option>put</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="daysToExp">
                    <Form.Label column sm="4">Days to Expiration</Form.Label>
                    <Col sm="5">
                      <Form.Control type="daysToExp" defaultValue="30" onChange={this.handleChange.bind(this)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="strike">
                    <Form.Label column sm="4">Strike</Form.Label>
                    <Col sm="5">
                      <Form.Control type="strike" defaultValue="100" onChange={this.handleChange.bind(this)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="spot">
                    <Form.Label column sm="4">Spot</Form.Label>
                    <Col sm="5">
                      <Form.Control type="spot" defaultValue="100" onChange={this.handleChange.bind(this)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="volatility">
                    <Form.Label column sm="4">Volatility</Form.Label>
                    <Col sm="5">
                      <Form.Control type="type" defaultValue="0.1" onChange={this.handleChange.bind(this)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="riskFreeRate">
                    <Form.Label column sm="4">Risk Free Rate of Return</Form.Label>
                    <Col sm="5">
                      <Form.Control type="riskFreeRate" defaultValue="0.06" onChange={this.handleChange.bind(this)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="steps">
                    <Form.Label column sm="4">Number of Steps</Form.Label>
                    <Col sm="5">
                      <Form.Control type="steps" defaultValue="1000" onChange={this.handleChange.bind(this)} />
                    </Col>
                  </Form.Group>
                  <Button variant="primary" type="submit">Calculate</Button>
                </Form>
              </Col>
              <Col xs={12} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Payoff</Card.Title>
                    <Card.Text>{this.state.payoff}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={1}></Col>
            </Row>
            <Row className="fullcredits">
              <Col xs={12} md={12}>
                <p>Recently I've been reading Mark Joshi's book titled C++ Design Patterns &amp; Derivatives and </p>
              </Col>
            </Row>
          </Col>
      </Container>
    )
  }
}