import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/ui/Common-Section/CommonSection';
import { useNavigate } from 'react-router-dom';
import '../styles/forgot_password.css';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // To manage the flow
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/user/sendOtpForForgetPassword', { email });
            if (response.data.success) {
                setStep(2); // Move to OTP verification step
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/user/verifyEmail', { email, otp });
            console.log("VerifyOtP",response.data);
            
            if (response.data) {
                setStep(3); // Move to password reset step
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/user/ChangePassword', { email, newPassword });
            console.log("ChangePassword",response.data);
            
            if (response.data) {
                navigate('/sign-in'); // Redirect to sign-in page
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CommonSection title={"Forgot Password"} />
            <section>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col className='col-md-auto'>
                            {step === 1 && (
                                <form onSubmit={handleEmailSubmit}>
                                    <div className='form__input'>
                                        <label htmlFor="email">Email ID</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            placeholder='user@gmail.com' 
                                            required 
                                        />
                                    </div>
                                    {error && <p className="error">{error}</p>}
                                    <div className='d-flex justify-content-center mt-5'>
                                        <button type="submit" className='btn__btn d-flex gap-2 align-items-center' disabled={loading}>
                                            {loading ? 'Sending OTP...' : 'Send OTP'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 2 && (
                                <form onSubmit={handleOtpSubmit}>
                                    <div className='form__input'>
                                        <label htmlFor="otp">OTP</label>
                                        <input 
                                            type="text" 
                                            name="otp" 
                                            id="otp" 
                                            value={otp} 
                                            onChange={(e) => setOtp(e.target.value)} 
                                            placeholder='Enter OTP' 
                                            required 
                                        />
                                    </div>
                                    {error && <p className="error">{error}</p>}
                                    <div className='d-flex justify-content-center mt-5'>
                                        <button type="submit" className='btn__btn d-flex gap-2 align-items-center' disabled={loading}>
                                            {loading ? 'Verifying...' : 'Verify'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 3 && (
                                <form onSubmit={handlePasswordSubmit}>
                                    <div className='form__input'>
                                        <label htmlFor="newPassword">New Password</label>
                                        <input 
                                            type="password" 
                                            name="newPassword" 
                                            id="newPassword" 
                                            value={newPassword} 
                                            onChange={(e) => setNewPassword(e.target.value)} 
                                            placeholder='New password' 
                                            required 
                                        />
                                    </div>
                                    <div className='form__input'>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword" 
                                            id="confirmPassword" 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                            placeholder='Confirm password' 
                                            required 
                                        />
                                    </div>
                                    {error && <p className="error">{error}</p>}
                                    <div className='d-flex justify-content-center mt-5'>
                                        <button type="submit" className='btn__btn d-flex gap-2 align-items-center' disabled={loading}>
                                            {loading ? 'Resetting...' : 'Reset Password'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default ForgotPassword;
