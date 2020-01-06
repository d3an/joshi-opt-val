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
        this.setState({'payoff': res.data});
      })
      .catch(err => {
      });
  }

  render() {
    return (
      <Container>
          <Col xs={12} md={12}>
            <Row>
              <Col xs={12} md={12}>
                <h1>Monte Carlo Option Valuation</h1>
                <p className='credits'>Developed by James Bury. Powered by C++ and WebAssembly.</p>
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
                <h3>Developer's Note</h3>
                <p>This is a serverless app that uses C++, React, JavaScript, and WebAssembly to calculate the payoffs of vanilla financial derivatives.</p>
                <p>The frontend of this app was built solely by myself during a 6 hour period on Sunday December 22, 2019. Development time was between 1pm and 7pm, mainly during the Coffee and Code meetup taking place at The Tempered Press in the Trinity Bellwoods neighbourhood of Toronto.</p>
                <p>As an attempt to break into the quant developer field, I've been studying option valuations over the last few months. My favourite technical book on option valuation has been C++ Design Patterns &amp; Derivatives Pricing by Mark Joshi. The majority of the C++ codebase for this app can be found in Chapter 2 of his book.</p>
                <p>The rest of this app's backend was built by myself as I followed the practices found in Level Up with WebAssembly by Robert Aboukhalil. Prior to reading this book, I was stumbling around in the dark trying to refactor every WebAssembly project or tutorial I could find. Unfortunately, most development with this new technology is done with Rust and very basic web architecture. Very little is done with C++, much less with React.</p>
                <p>The app's backend is currently running as a serverless function deployed on Cloudflare's Worker platform. The Cloudflare endpoint has been benchmarked to have its slowest run at 50ms, which is at least 10x faster than AWS Lambdas, Google Cloud Functions, and Azure Functions at their fastest runtimes.</p>
                <h3>Coming Next</h3>
                <p>Future improvements may include a switch to Fastly's Compute@Edge platform, once it becomes live for commercial use. Fastly's platform features a 35µs function initialization time, which would be a very impressive speed-up for this use case.</p>
                <p>I'll also continue to update the Cloudflare worker as I progress through more of Joshi's book. My plan is to add support for more complex derivatives, as well as a choice of the randomization method used. Currently the app uses the Box-Muller randomization algorithm implemented by Mark Joshi.</p>
                <p>With regards to the app's reliability, I plan to add a WebAssembly loader switch that allows a user to specify how they'd like to compute their request. Currently, Cloudflare times out at 50ms of computation time. In other words, if the step count is greater than 100,000, then there is a high chance the function request will fail. By adding a WebAssembly loader switch, users could take responsibility for their own computations by running the function on their personal CPUs.</p>
                <p>I've struggled heavily trying to add this functionality to an app developed with create-react-app. The best way to solve this problem would be to eject create-react-app. However, I'd prefer to avoid working directly with Webpack for as long as I can.</p>
              </Col>
            </Row>
          </Col>
      </Container>
    )
  }
}
