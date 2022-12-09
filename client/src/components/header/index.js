import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/reducer/userSlice';
import './style.modules.css';

const Header = () => {
    const { user } = useSelector((state) => state.userState);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutHandler = () => {
      dispatch(userLogout())
      navigate('/login');

    }
    return (
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='/'>The Book Spot </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'></Nav>
                    <Nav>
                        <LinkContainer to={'/card'}>
                            <Nav.Link>
                                <i
                                    className='fa fa-shopping-cart pe-2'
                                    aria-hidden='true'
                                ></i>
                                Card
                            </Nav.Link>
                        </LinkContainer>
                        {user ? (
                            <NavDropdown
                                className='header-dropdown'
                                title={user.name}
                                id='username'
                            >
                                <LinkContainer to={'/profile'}>
                                    <NavDropdown.Item>
                                        <i
                                            class='fa fa-user icons'
                                            aria-hidden='true'
                                        ></i>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <i
                                        class='fa fa-sign-out icons'
                                        aria-hidden='true'
                                    ></i>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to={'/login'}>
                                <Nav.Link>
                                    <i
                                        className='fa fa-user pe-2'
                                        aria-hidden='true'
                                    ></i>
                                    Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
