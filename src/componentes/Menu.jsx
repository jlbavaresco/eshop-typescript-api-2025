'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';


function Menu() {

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link className="navbar-brand" aria-current="page" href="/">eShop</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                <Link className="dropdown-item" href="privado/categorias">Categorias</Link>
                                <Link className="dropdown-item" href="privado/produtos">Produtos</Link>
                            </NavDropdown>
                            <Link className="nav-link active" aria-current="page" href="/sobre">Sobre...</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Autenticado como: <a href="#login">Jorge Bavaresco</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Menu;