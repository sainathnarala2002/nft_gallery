import React from 'react'
import CommonSection from '../components/ui/Common-Section/CommonSection'
import { Container, Row, Col } from 'reactstrap';


function SignUp() {
  return (
    <>
      <CommonSection title={"Sign Up"} />
      <section>
        <Container>
          <Row className='justify-content-md-center'>
            <Col className=''>
              <form action="">
                <div className='d-flex gap-4 justify-content-center '>
                  <div className="form__input">
                    <label htmlFor='first_Name'>First Name</label>
                    <input type="text" name='first_Name' id='' placeholder='First Name' />
                  </div>
                  <div className="form__input">
                    <label htmlFor='last_Name'>Last Name</label>
                    <input type="text" name='last_Name' id='' placeholder='Last Name' />
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default SignUp