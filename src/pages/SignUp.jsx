import axios from 'axios';
import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import CommonSection from '../components/ui/Common-Section/CommonSection';
import { Container, Row, Col } from 'reactstrap';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    emailOtp: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  // const [emailOtp, setEmailOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmailOtp = async () => {
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // setEmailOtp(otp);
  
    try {
      // Call the backend API to send the email OTP
      await axios.post('http://localhost:5000/api/sendOtp', {
        email: formData.email, 
      });
  
      setEmailOtpSent(true);
      alert('Email OTP sent successfully');
    } catch (error) {
      console.error('Error sending email OTP:', error);
      alert('Failed to send email OTP. Please try again.');
    }
  };
  

  
  const verifyEmailOtp = () => {
    if (formData.emailOtp === emailOtpSent) {
      setEmailVerified(true);
      alert("Email verified successfully");
    } else {
      alert("Invalid email OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (emailVerified ) {
      console.log(formData);
      // Call the register function here
      registerUser(formData).then(response => {
        alert("Registration successful");
      }).catch(error => {
        alert("Registration failed: " + error.message);
      });
    } else {
      alert("Please verify both email and mobile OTPs.");
    }
  };

  return (
    <>
      <CommonSection title={"Sign Up"} />
      <section>
        <Container>
          <form onSubmit={handleSubmit}>
            <Row className='justify-content-md-center'>
              <Col className='d-flex gap-4 justify-content-center '>
                <div className="form__input">
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder='First Name'
                  />
                </div>
                <div className="form__input">
                  <label htmlFor='middleName'>Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder='Middle Name'
                  />
                </div>
                <div className="form__input">
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder='Last Name'
                  />
                </div>
                <div className="form__input">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
            </Row>
            <Row className='justify-content-md-center'>
              <Col className='d-flex gap-4 justify-content-center ' >
                <div className="form__input">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder='Mobile Number'
                    />
                  </div>
                </div>
                <div className="form__input">
                  <label htmlFor="email" className='text-white'>Email</label>
                  <div className="d-flex">
                    <input
                      type="email"
                      className='form-control'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder='abc@gmail.com'
                    />
                    <button
                      type='button'
                      className='btn btn-primary w-50 ms-2'
                      onClick={sendEmailOtp}
                      disabled={emailOtpSent || !formData.email}
                    >
                      {emailOtpSent ? 'OTP Sent' : 'Send OTP'}
                    </button>
                  </div>
                </div>
                {emailOtpSent && (
                  <div className="form__input mb-3">
                    <label htmlFor="emailOtp" className="text-white">Email OTP</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="emailOtp" 
                      name="emailOtp"
                      value={formData.emailOtp}
                      onChange={handleChange}
                      onBlur={verifyEmailOtp}
                      required 
                    />
                  </div>
                )}
              </Col>
            </Row>
            <Row className={'justify-content-md-center'}>
              <Col className={'d-flex gap-4 justify-content-center '}>
              {emailVerified &&(
                <div className="form__input">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={!emailVerified }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={!emailVerified }
                    />
                  </div>
                </div>
              )
              }
              </Col>
            </Row>
            <Row className={'justify-content-md-center'}>
              <Col className={'d-flex gap-4 justify-content-center '}>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={!emailVerified }
                >
                  Sign Up
                </button>
              </Col>
            </Row>
          </form>
        </Container>
      </section>
    </>
  )
}

export default SignUp;
