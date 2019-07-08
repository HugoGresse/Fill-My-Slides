import React, { Component } from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import FillMySlideUI from "./FillMySlideUI"
import withStyles from "@material-ui/core/styles/withStyles"
import LoginAndInitGapi from "./LoginAndInitGapi"


const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
});

class App extends Component {


    render() {
        const {classes} = this.props


        return (
            <LoginAndInitGapi>
                <div className="App">
                    <CssBaseline/>
                    <Typography variant="h6" color="inherit" noWrap>
                        Fill my slides
                    </Typography>
                    <main className={classes.layout}>
                        <FillMySlideUI/>
                    </main>
                </div>
            </LoginAndInitGapi>
        );

    }
}

export default withStyles(styles)(App);
