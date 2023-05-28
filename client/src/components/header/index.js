import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userListReset } from '../../store/reducer/adminSlice';
import { resetOrder } from '../../store/reducer/orderSlice';
import { userLogout } from '../../store/reducer/userSlice';
import './style.modules.css';

const Header = () => {
    const { user } = useSelector((state) => state.userState);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(userLogout());
        dispatch(resetOrder());
        dispatch(userListReset());
        navigate('/login');
    };
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
                                Cart
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
                                            className='fa fa-user icons'
                                            aria-hidden='true'
                                        ></i>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <i
                                        className='fa fa-sign-out icons'
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
                        {user && user.isAdmin ? (
                            <NavDropdown
                                className='header-dropdown'
                                title={'admin'}
                                id='username'
                            >
                                <LinkContainer to={'/admin/userlist'}>
                                    <NavDropdown.Item>
                                        <i
                                            className='fa fa-user icons'
                                            aria-hidden='true'
                                        ></i>
                                        UserList
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to={'/admin/orderlist'}>
                                    <NavDropdown.Item>
                                        
                                      
                                        <i className="fa fa-list icons"></i>
                                        OrderList
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to={'/admin/productlist'}>
                                    <NavDropdown.Item>
                                        <i
                                            className='fa fa-list icons'
                                            aria-hidden='true'
                                        ></i>
                                        ProductList
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
