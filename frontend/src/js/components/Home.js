import React from 'react';
import Goos from './Goos';
import {Row, Col} from 'react-materialize';

const Home = () => (
  <Row>
    <Col offset='s1' s={4}>
      <Goos/>
    </Col>
  </Row>
)

export default Home;
