import React from 'react'
import {Row, Col} from 'react-materialize'
import GooForm from './GooForm'

const NewGoo = () => (
  <Row>
    <Col offset='s1' s={4}>
      <GooForm/>
    </Col>
  </Row>
)

export default NewGoo
