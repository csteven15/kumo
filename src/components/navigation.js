import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

const styles = {
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: -12,
    },
    menuButton: {
        marginRight: 16,
        marginLeft: -12,
    },
};

function Navigation(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed">

        <Toolbar>
        <Typography variant="title" color="inherit">Kumo</Typography>

        <section className={classes.rightToolbar}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/menu">Menu</Button>
            <Button color="inherit" component={Link} to="/gallery">Gallery</Button>
            <Button color="inherit" component={Link} to="/contact">Contact Us</Button>

        </section>
        </Toolbar>

    </AppBar>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);