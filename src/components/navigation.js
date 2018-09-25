import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

// background: #eeeeee;
// background: -moz-linear-gradient(left, #eeeeee 10%, #edf900 27%, #00d114 42%, #00d2fc 54%, #5f00bf 76%, #ed0000 100%);
// background: -webkit-linear-gradient(left, #eeeeee 10%,#edf900 27%,#00d114 42%,#00d2fc 54%,#5f00bf 76%,#ed0000 100%);
// background: linear-gradient(to right, #eeeeee 10%,#edf900 27%,#00d114 42%,#00d2fc 54%,#5f00bf 76%,#ed0000 100%);
// filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#ed0000',GradientType=1 );

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
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/" style={{ fontSize: '24px'}}><strong>Kumo Asian Kitchen</strong></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/menu">Menu</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/gallery">Gallery</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/contact">Contact Us</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

}

export default Navigation;
