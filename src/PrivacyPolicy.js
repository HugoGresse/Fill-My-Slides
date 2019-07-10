import React, { Component } from 'react';
import './fillmyslides/FillMySlidesApp.css';
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import Container from "@material-ui/core/Container"

const styles = theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
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

class PrivacyPolicy extends Component {


    render() {
        const {classes} = this.props

        return (
            <div>

                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h3" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Fill My Slides Privacy Policy
                        </Typography>
                        <Typography color="textSecondary" paragraph>
This website is provided by Hugo Gresse, an individual living in Montpellier, France.<br/><br/>

                            This app is dedicated to peoples wanting to use Google Slides as a template for thumbnail or images. It access the given Slides, and after selection the data to be updated and where to update it, generate images of the first slide. The first slide is updated for each image. Please take a few minutes to read this Privacy Policy, so that you understand which information we collect, what we do with it and how we manage it. We are committed to protecting your privacy.<br/><br/>

                            Your information your provide upon login & autorising your Google Slides/Drive access will not be shared to anyone. The app does not include any tracker such as Google Analytics. By using the service, yo do consent to technical information to be reported.<br/><br/>

                            All data that you directly enter when you sign-in and while using our services are only needed to directly use the service and are not stored outside of Google services.<br/>

                        </Typography>

                        <Typography component="h6">
                            What information do we collect?
                        </Typography>

                        <Typography color="textSecondary" paragraph>
                            By using this service, you are required to provide us with information that may identify you directly or indirectly. We collect the minimum information required to achieve the purposes set out in this Policy. To benefit from this service, you need to login using Google Authentification & allow this services to access Google Presentation & Drive. <br/><br/>

                            To learn more about the data to which Google may have access and how they use them, please refer to the <a rel="noopener noreferrer"  href="https://www.google.com/policies/privacy/" target="_blank">Privacy Policy of Google</a>.<br/><br/>

                            When you use our service, we also collect your log data such as:<br/><br/>

                            - The number of images generated><br/>
                            - Your user ID provided by Google login><br/>
                            - the number of user using the service><br/>
                            - access to your presentation with write access (to update text inside those before generating the images)<br/>
                            - access to drive (required by the prior access)<br/><br/>

                            The following data are only collected by Google and not used by the service:<br/>
                            - email<br/>
                            - profile<br/>
                            - openid<br/>
                        </Typography>

                        <Typography component="h6">
                            What do we do with your information?
                        </Typography>

                        <Typography color="textSecondary" paragraph>
                            All this information is used by Hugo Gresse to provide you the services related to the use of the FillMySlides, and especially for the following purpose:<br/><br/>

                            - Update the provided Google Slides<br/>
                            - Generate thumbnail from the Google Slides<br/>
                            - Monitor statistics such as total number of users and daily images generated<br/>
                        </Typography>

                        <Typography component="h6">
                            Do we use cookies?
                        </Typography>

                        <Typography color="textSecondary" paragraph>
                            FillMySlides does not set cookies to collect log data.<br/><br/>

                            Google Authentification & Google APIsis using cookies to log you and use Google Services such as Google Slides API. These information only store non-personally identifiable information and do not include your email address. If you need more information about Google process please see the section below.
                        </Typography>

                        <Typography component="h6">
                            What are your privacy rights?
                        </Typography>

                        <Typography color="textSecondary" paragraph>
                            In accordance with the legislation in force, you have the right to access, modify or delete your personal data as well as the right to object to their processing. In order to exercise these rights, you can send your requests to Google as FillMySlides don't store any of your personal information.
                        </Typography>

                        <Typography component="h6">
                            Other things to know?
                        </Typography>
                        <Typography color="textSecondary" paragraph>
                            Anyone whose personal data are collected may set guidelines, general or specific, regarding the retention, deletion and communication of his or her personal data after his or her death. The general directives can be registered with a trusted third party certified by the CNIL. General or specific instructions may be changed or deleted at any time.<br/><br/>

                            Hugo Gresse reserves the right to modify this Privacy Policy at any time. We encourage you to check it regularly.<br/><br/>

                            If you would like to receive additional information, you can send us your questions by email to the following address: hugo.gresse@gmail.com<br/><br/>

                            Our app may contain sponsored links referring  to websites of other partners. If you follow a link to one of such websites, please note that they have their own privacy policies, and we disclaim any responsibility for them. Please consult their privacy policies before providing any personal information on such websites.
                        </Typography>

                    </Container>
                </div>
            </div>
        );

    }
}

export default withStyles(styles)(PrivacyPolicy);
