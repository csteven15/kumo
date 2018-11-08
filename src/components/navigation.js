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
        this.closeNavbar = this.closeNavbar.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    closeNavbar() {
        this.setState({
            isOpen: false
        });
        window.scrollTo(0,0);
    }
    render() {
        return (
            <Navbar color="light" light expand="md" fixed="top" style={{paddingLeft: "2em", paddingRight: "2em", fontSize: "18px"}}>
                <NavbarBrand href="/" style={{ fontSize: '24px', marginLeft: '2%'}}><img src={require('../images/logo.svg')} alt="Kumo Logo" width="80" /></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar style={{fontFamily: "Rochester, sans-serif", marginRight: "3%"}}>
                        <NavItem>
                            <NavLink tag={Link} to="/" onClick={this.closeNavbar} activeClassName="current"><strong>Home</strong></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/menu" onClick={this.closeNavbar} activeClassName="current"><strong>Menu</strong></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/gallery" onClick={this.closeNavbar} activeClassName="current"><strong>Gallery</strong></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/contact" onClick={this.closeNavbar} activeClassName="current"><strong>Contact Us</strong></NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

}

export default Navigation;
