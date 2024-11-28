import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function AppNavbar() {

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default AppNavbar;