import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import icon from "../fillmyslides.svg"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"

const styles = theme => ({
    appBar: {
        "& a": {
            color: "#fff",
            textDecoration: "none"
        }
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        width: 40,
        marginRight: 30
    },
});

class Header extends Component {

    render() {
        const {classes} = this.props

        return (
            <AppBar position="relative" color="secondary" className={classes.appBar}>
                <Toolbar>
                    <img src={icon} alt="logo" className={classes.logo}/>
                    <Link to="/" className={classes.title}>
                        <Typography variant="h6" color="inherit">
                            Fill My Slides
                        </Typography>
                    </Link>

                    <Link to="/app">
                        <Button color="inherit">App</Button>
                    </Link>

                    <Link to="/privacy">
                        <Button color="inherit">Privacy policy</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
