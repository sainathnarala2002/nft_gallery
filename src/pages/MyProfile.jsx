import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/ui/Common-Section/CommonSection';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user, logout } = useContext(AuthContext); // Access token and logout function from AuthContext
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    mobileNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/sign-in'); // Redirect to sign-in if the user is not authenticated
  //     return;
  //   }

  //   // Fetch user details from backend
  //   const fetchUserData = async () => {
  //     try {
  //       console.log("User=>",user);
        
  //       const response = await axios.get('http://localhost:5001/user/getUser', {
  //         headers: {
  //           Authorization: `Bearer,${user}`, // Use the token stored in AuthContext
  //         },
  //       });
  //       console.log("RES=>",response);
        
  //       setFormData(response.data); // Update state with fetched user data
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       setError('Failed to fetch user data.');
  //       // if (error.response && error.response.status === 403) {
  //       //   // logout(); // Log out the user if the token is invalid
  //       //   // navigate('/sign-in'); // Redirect to sign-in
  //       // }
  //     }
  //   };

  //   fetchUserData();
  // }, [user, logout, navigate]);

  useEffect(() => {
      
    // Fetch user details from backend
    const fetchUserData = async () => {
      try {
        console.log("User=>", user);
        
        const response = await axios.get('http://localhost:5001/user/getUser', {
          headers: {
            Authorization: `Bearer ${user}`, // Ensure there is no comma
          },
        });
        console.log("RES=>", response);
        
        const userData = response.data.data;
        setFormData({
          firstName: userData.firstName || '',
          middleName: userData.middleName || '',
          lastName: userData.lastName || '',
          dob: userData.dob ? userData.dob.split('T')[0] : '', // Format date
          email: userData.email || '',
          mobileNumber: userData.mobileNumber || '',
        });
        // setFormData(response.data.data); // Update state with fetched user data
      } catch (error) {
        console.log({
          Authorization: `Bearer ${user}`,
        });
        console.error('Error fetching user data:', error);
  
        if (error.response && error.response.status === 403) {
          setError('You are not authorized to view this data. Please log in again.');
          // logout();
          // navigate('/sign-in');
        } else {
          setError('Failed to fetch user data.');
        }
      }
    };
    fetchUserData();
  
  }, [user, logout, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.put('http://localhost:5001/user/updateMyProfile', formData, {
        headers: {
          Authorization: `Bearer ${user}`, // Use the token stored in AuthContext
        },
      });

      if (response.data.success) {
        alert('Profile updated successfully.');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/sign-in'); // Redirect to sign-in page after logout
  };

  return (
    <>
      <CommonSection title={"My Profile"} />
      <section>
        <Container>
          <Row className='justify-content-md-center'>
            <Col md='6'>
              <form onSubmit={handleSubmit}>
                <div className='form__input'>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form__input'>
                  <label htmlFor='middleName'>Middle Name</label>
                  <input
                    type='text'
                    name='middleName'
                    id='middleName'
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </div>

                <div className='form__input'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form__input'>
                  <label htmlFor='dob'>Date of Birth</label>
                  <input
                    type='date'
                    name='dob'
                    id='dob'
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form__input'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>

                <div className='form__input'>
                  <label htmlFor='mobile'>Mobile</label>
                  <input
                    type='text'
                    name='mobile'
                    id='mobile'
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className='error'>{error}</p>}
                
                <div className='d-flex justify-content-center'>
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>

              <div className='d-flex justify-content-center mt-4'>
                <button onClick={handleLogout} className='btn btn-danger'>
                  Logout
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MyProfile;


