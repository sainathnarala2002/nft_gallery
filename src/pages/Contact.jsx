import React,{useRef} from 'react'

import CommonSection from '../components/ui/Common-Section/CommonSection';
import { Container, Row, Col} from 'reactstrap';

const Contact = () => {

  const nameRef = useRef('')
  const emailRef = useRef('')
  const subjectRef = useRef('')
  const messageRef = useRef('')
  
  const handleSubmit = (e) =>{
    e.preventDefault();
  };
  return (
  <>
    <CommonSection title='Contact'/>
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' className='m-auto text-center'>
            <h2>Drop a message</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, repellendus voluptatum? Quos.</p>
            <div className="contact mt-4">
              <form onSubmit={handleSubmit}>
                <div className="form__input">
                  <input type="text" placeholder="Enter your Name" ref={nameRef} />
                </div>
                <div className="form__input">
                  <input type="email" placeholder="Enter your Email" ref={emailRef} />
                </div>
                <div className="form__input">
                  <input type="text" placeholder="Enter subject" ref={subjectRef} />
                </div>
                <div className="form__input">
                  <textarea rows="7" placeholder='Write message' ref={messageRef}></textarea>
                </div>
                <button  className='send-btn' style={{border: "none", padding: "7px 25px", borderRadius: "5px", marginTop: "20px"}}>Send a message</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </>
  )  
};

export default Contact