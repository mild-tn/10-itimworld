import React from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
    width : 100%;
    background-size : cover;
    background-position : center;
    padding:60px;
`
const Box = styled.div`
    background-color : white;
    padding : 2em;
    border-radius : 10px;
    margin-top : 5em;
    font-size:1.2em;
`

export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='row d-flex justify-content-center'>
              <Box className='col-lg-6 col-sm-10'>
                <div className='text-center d-flex justify-content-center'><h3>ตกลงแล้ว</h3></div>
                <div className='text-center d-flex justify-content-center'><label>หมายเหตุ หากสลิปมีปัญหาจะมีการติดต่อไปภายหลัง</label></div>
                <div className='text-center d-flex justify-content-center'>
                  <button type='button' className='btn btn-outline-primary'><h3>เข้ากลุ่มดิ๊</h3></button>
                </div>
              </Box>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}