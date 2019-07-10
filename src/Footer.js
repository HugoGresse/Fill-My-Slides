import React, { Component } from 'react';
import './fillmyslides/FillMySlidesApp.css';
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import Link from "@material-ui/core/Link"

const styles = theme => ({
    footer: {
        backgroundColor: "#fbfbfb",
        padding: theme.spacing(6),
    },
});

class Footer extends Component {
    render() {
        const {classes} = this.props

        return (
                <footer className={classes.footer}>
                    <Typography align="center" gutterBottom>
                        Made by <Link href="https://hugo.gresse.io">Hugo Gresse</Link>
                    </Typography>
                </footer>
        );
    }
}

export default withStyles(styles)(Footer);
