import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import getToken from '../../utils/getToken'

const Container = styled.div`
  background-color: #332f26;
  background-image: url('../../static/img/bg.png');
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  height: 100%;
  min-height: 100vh;
`

const Main = (props) => {
  return (
    <Container {...props}>
      {props.children}
    </Container>
  )
}

export default compose(
  getToken()
)(Main)
