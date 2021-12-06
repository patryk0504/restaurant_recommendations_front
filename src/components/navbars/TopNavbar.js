import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EventBus from "../auth/EventBus";

export default function TopNavbar(props) {
    return (
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'
                style={{zIndex: '900', marginBottom: '10rem'}}>
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className="me-auto">
                        {/*<Navbar.Brand as={Link} to={"/restaurants"}>Polish Restaurants</Navbar.Brand>*/}
                        {/*<Nav.Link as={Link} to={"/home"}>Home</Nav.Link>*/}
                        {props.currentUser ? (
                            <>
                                <Navbar.Brand as={Link} to={"/restaurants"}>Polish Restaurants</Navbar.Brand>
                                <Nav.Link as={Link} to={"/profile"}>{props.currentUser.username}</Nav.Link>
                                <Nav.Link as={Link} to={"/restaurants"}>All Restaurants</Nav.Link>
                                <Nav.Link as={Link} to={"/restaurant/recommendation/users"}>Recommendations</Nav.Link>
                                <Nav.Link as={Link} to={"/users"}>Other users</Nav.Link>
                                <Nav.Link as={Link} to={"/login"} onClick={(e) => {
                                    EventBus.dispatch("logout");
                                }}>LogOut</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Navbar.Brand as={Link} to={"/home"}>Polish Restaurants</Navbar.Brand>
                                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                                <Nav.Link as={Link} to={"/register"}>Sign Up</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
                {/*<Navbar.Collapse className="justify-content-end">*/}
                {/*<Navbar.Text>*/}
                {/*    REST API host: <div className="text-light bg-dark">{process.env.REACT_APP_API_URL}</div>*/}
                {/*</Navbar.Text>*/}
                {/*</Navbar.Collapse>*/}
            </Container>
        </Navbar>
    )
}