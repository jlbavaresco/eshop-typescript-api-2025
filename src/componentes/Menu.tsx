'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


function Menu() {

    const { data: session } = useSession();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link className="navbar-brand" aria-current="page" href="/">eShop</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            {session != null &&
                                <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                    <Link className="dropdown-item" href="privado/categorias">Categorias</Link>
                                    <Link className="dropdown-item" href="privado/produtos">Produtos</Link>
                                </NavDropdown>
                            }
                            <Link className="nav-link active" aria-current="page" href="/sobre">Sobre...</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={session == null ? 'Login' : session?.user?.name} id="basic-nav-dropdown">
                            {session == null &&
                                <button type="submit" className="dropdown-item" onClick={() => signIn()}>Login</button>
                            }
                            {session != null &&
                                <>
                                    <Link className="dropdown-item" href={`/user`}>Meus Dados</Link>
                                    <button type="submit" className="dropdown-item" onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
                                </>
                            }
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Menu;