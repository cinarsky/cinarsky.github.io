import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@alifd/next/dist/next.css';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;
class App extends Component {
  render() {
    return (
      <div className="App">
              <div className="demo-title">One</div>
        <Row>
            <Col span="24">col-24</Col>
        </Row>

        <div className="demo-title">Two</div>
        <Row>
            <Col span="12">col-12</Col>
            <Col span="12">col-12</Col>
        </Row>

        <div className="demo-title">Three</div>
        <Row>
            <Col span="8">col-8</Col>
            <Col span="8">col-8</Col>
            <Col span="8">col-8</Col>
        </Row>

        <div className="demo-title">Four</div>
        <Row>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
        </Row>

        <div className="demo-title">Five</div>
        <Row>
            <Col span="1p5">col-1p5</Col>
            <Col span="1p5">col-1p5</Col>
            <Col span="1p5">col-1p5</Col>
            <Col span="1p5">col-1p5</Col>
            <Col span="1p5">col-1p5</Col>
        </Row>

        <div className="demo-title">Six</div>
        <Row>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
      </div>
    );
  }
}

export default App;
