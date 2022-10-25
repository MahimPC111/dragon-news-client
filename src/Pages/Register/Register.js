import React, { useContext } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Register = () => {

    const { createUser, updateUserProfile, verifyUserEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoURL = form.photoURL.value;

        // console.log(event)

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset();
                setError('');
                navigate('/');
                handleUpdateUserProfile(name, photoURL);
                handleEmailVerification();
                toast.success('Please verify your email address.')
            })
            .catch(e => {
                console.error(e);
                setError(e.message);
            })
    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        };
        updateUserProfile(profile)
            .then(() => { })
            .catch(e => console.error(e))
    }

    const handleEmailVerification = () => {
        verifyUserEmail()
            .then(() => { })
            .catch(e => console.error(e))
    }

    const handleAccepted = (event) => {
        // setAccepted(!accepted);
        setAccepted(event.target.checked)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Enter your full name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control name='photoURL' type="text" placeholder="Enter photo URL" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Enter Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check onClick={handleAccepted} type="checkbox" label={<>I accept <Link to='/terms'>terms and conditions,</Link></>} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!accepted}>
                Submit
            </Button>
            <Form.Text className="text-danger d-block">
                {error}
            </Form.Text>
        </Form>
    );
};

export default Register;