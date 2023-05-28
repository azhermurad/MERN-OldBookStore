import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className="bg-dark text-white py-3">
        <div className="container text-center">
            <div className="row">
                <div className="col-md-12">
                    <div className="block">
                        <a href="/" className="footer-logo mb-4">THE BOOK SPOT</a>
                        <ul className="list-inline footer-menu">
                            <li className="list-inline-item">
                                <a href="/">HOME</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#about">ABOUT</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#service">SERVICES</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#contact">CONTACT</a>
                            </li>
                        </ul>
                        <p className="copyright-text">Copyright © The Book Spot|
                            All right reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>
  );
};
export default MainLayout;
