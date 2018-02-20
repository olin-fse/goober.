import React from 'react';
import GooList from './GooList';
import {Row, Col} from 'react-materialize';

const Home = () => (
  <Row className='left'>
    <Col s={12}>
      <GooList/>
    </Col>
  </Row>
)

export default Home;
