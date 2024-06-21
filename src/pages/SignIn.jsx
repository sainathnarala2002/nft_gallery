import React from 'react';

import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../components/ui/Common-Section/CommonSection';
import { Link } from 'react-router-dom';
import '../styles/sign_in.css';

function SignIn() {
    return (
        <>
            <CommonSection title={"Sign In"} />
            <section>
                <Container >
                    <Row className='justify-content-md-center'>
                        <Col className='col-md-auto '>
                            <form action="">
                                <div className='form__input'>
                                    <label htmlFor="">Email ID</label>
                                    <input type="email" name="email" id="" placeholder='user@gmail.com' />

                                </div>

                                <div className='form__input'>
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" id="" placeholder='password' />
                                    <div className='position-relative fs-6 mt-4'>
                                        <Link to={"/home"} className='position-absolute bottom-0 end-0 text-decoration-none text-warning'>
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <button type="submit" className='btn__btn d-flex gap-2 align-items-center'>
                                        <Link to="/home">
                                            Sign In
                                        </Link>
                                    </button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SignIn;