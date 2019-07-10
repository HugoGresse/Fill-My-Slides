import React, { Component } from 'react';
import './FillMySlidesApp.css';
import withStyles from "@material-ui/core/styles/withStyles"
import FillMySlideUI from "./FillMySlideUI"
import LoginAndInitGapi from "./LoginAndInitGapi"

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
});

class FillMySlidesApp extends Component {
    render() {
        const {classes} = this.props

        return (
            <LoginAndInitGapi>
                <div className="App">
                    <main className={classes.layout}>
                        <FillMySlideUI/>
                    </main>
                </div>
            </LoginAndInitGapi>
        );
    }
}

export default withStyles(styles)(FillMySlidesApp);
