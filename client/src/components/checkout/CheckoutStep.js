import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

function CheckoutStep({step1,step2,step3,step4}) {
    const CHECKOUTSTEP = [
        {
            step:step1,
            link:"/login",
            title: "Sign In"
        },
        {
            step:step2,
            link:"/shipping",
            title: "Shipping"
        },
        {
            step:step3,
            link:"/payment",
            title: "Payment"
        },
        {
            step:step4,
            link:"/placeorder",
            title: "Place Order"
        }
    ]
    return (
        <Nav className='justify-content-center mb-3' defaultActiveKey="/shippine" variant='tabs'>
            {
                CHECKOUTSTEP.map(({step,link,title},index)=>
                    step ? (
                        <LinkContainer key={index} to={link}>
                            <Nav.Link>{title}</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link key={index} disabled>{title}</Nav.Link>
                    )
                )
            }
        </Nav>
    );
}

export default CheckoutStep;
