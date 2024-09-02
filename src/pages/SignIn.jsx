import axios from 'axios';
import React, { useContext,useState }  from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/ui/Common-Section/CommonSection';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/sign_in.css';

const SignIn = () => {
    const { login } = useContext(AuthContext); // Access the login function from AuthContext
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate(); // Hook to navigate programmatically
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        try {
          const response = await axios.post('http://localhost:5001/user/login', formData);
          
          if (response.data.success) {
            // alert('Sign in successful');
            login(response.data.user); // Save user data to context
            navigate('/home'); // Redirect to home after successful sign-in
            // Handle successful sign-in, e.g., redirecting or storing user info
          } else {
            setError(response.data.message);
          }
        } catch (error) {
          setError('Sign in failed. Please try again.');
          console.error('Error during sign-in:', error);
        } finally {
          setLoading(false);
        }
      };
    

    return (
        <>
            <CommonSection title={"Sign In"} />
            <section>
                <Container >
                    <Row className='justify-content-md-center'>
                        <Col className='col-md-auto '>
                            <form action="" onSubmit={handleSubmit}>
                                <div className='form__input'>
                                    <label htmlFor="">Email ID</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder='user@gmail.com' required/>

                                </div>

                                <div className='form__input'>
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder='password' required />
                                    <div className='position-relative fs-6 mt-4'>
                                        <Link to={"/forgot-password"} className='position-absolute bottom-0 end-0 text-decoration-none text-warning'>
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    {error && <p className="error">{error}</p>}
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <button type="submit" className='btn__btn d-flex gap-2 align-items-center'  disabled={loading}>
                                        <Link to="/home">
                                        {loading ? 'Signing In...' : 'Sign In'}
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