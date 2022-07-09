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
      <footer>footer</footer>
    </>
  );
};
export default MainLayout;
