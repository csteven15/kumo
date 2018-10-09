import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar color="dark" dark expand="md" fixed="top" style={{paddingLeft: "2em", paddingRight: "2em"}}>
                <NavbarBrand href="/" style={{ fontSize: '24px'}}><strong>Kumo Asian Kitchen</strong></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/"><strong>Home</strong></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/menu"><strong>Menu</strong></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/gallery"><strong>Gallery</strong></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/contact"><strong>Contact Us</strong></NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

}

export default Navigation;
