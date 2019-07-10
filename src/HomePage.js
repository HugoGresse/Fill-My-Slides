import React, { Component } from 'react';
import './fillmyslides/FillMySlidesApp.css';
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"

const styles = theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
        "& a": {
            textDecoration: "none"
        }
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: "#fbfbfb",
        padding: theme.spacing(6),
    },
});

class HomePage extends Component {


    render() {
        const {classes} = this.props

        return (
            <div>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Fill My Slides
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            This will generate images (as many as you want) of the first slide of the given Google Slide
                            <br/>filled with your data. <br/><br/>
                            It will change the content of your slide to do so.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Link to="/app">
                                        <Button variant="contained" color="secondary">
                                            Open App
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HomePage);
