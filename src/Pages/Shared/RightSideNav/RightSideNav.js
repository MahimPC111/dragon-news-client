import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaTwitch, FaWhatsapp, FaTasks } from "react-icons/fa";
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const RightSideNav = () => {

    const { providerLogin } = useContext(AuthContext);

    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(provider)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(error => console.error(error))
    }
    return (
        <div>
            <ButtonGroup vertical>
                <Button onClick={(handleGoogleSignIn)} className='mb-2' variant="outline-primary"><FaGoogle /> Login with Google</Button>
                <Button variant="outline-dark"><FaGithub /> Log in with Github</Button>
            </ButtonGroup>
            <h5 className='mt-4'>Find us on:</h5>
            <ListGroup>
                <ListGroup.Item className='mb-2'><FaFacebook /> Facebook</ListGroup.Item>
                <ListGroup.Item className='mb-2'><FaTwitter /> Twitter</ListGroup.Item>
                <ListGroup.Item className='mb-2'><FaTwitch /> Twitch</ListGroup.Item>
                <ListGroup.Item className='mb-2'><FaWhatsapp /> WhatsApp</ListGroup.Item>
                <ListGroup.Item className='mb-2'><FaTasks /> Terms & conditions</ListGroup.Item>
            </ListGroup>
            <BrandCarousel></BrandCarousel>
        </div>
    );
};

export default RightSideNav;