import React from 'react';
import Goos from './Goos';
import {Row, Col} from 'react-materialize';

const Home = () => (
  <Row className='left'>
    <Col s={6}>
      <Goos/>
    </Col>
  </Row>
)

export default Home;
