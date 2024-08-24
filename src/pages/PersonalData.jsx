// page with option to edit personal data and change password(?)

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
//added by RM
import { useAPI } from './Context/Context';

function PersonalData() {
  const { user, updateUserInfo, deleteUser } = useAPI();
  //killing bugs
  console.log("User Object", user)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        password: '' // I mean we have to pretend we care :D
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.first_name && formData.last_name && formData.email) {
      setIsLoading(true);
      try {
        await updateUserInfo(formData);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Failed to update user info:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await deleteUser();
        navigate('/'); // Redirect to home after deleting
      } catch (error) {
        console.error('Failed to delete account:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleReturn = () => {
    navigate('/');
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
        <span className="ms-2">Loading user data...</span>
      </div>
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-3" controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>

        <Button className="m-2" variant="primary" type="submit" disabled={isLoading || isSubmitted}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Save'}
        </Button>

        <Button className="m-2" variant="secondary" onClick={handleReturn}>
          Return Home
        </Button>
      </Form>

      <div className="mt-3">
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? <Spinner animation="border" size="sm" /> : 'Delete Account'}
        </Button>
      </div>
    </>
  );
  //this is a change to solve a commit issue
}
export default PersonalData;