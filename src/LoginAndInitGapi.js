import React, { Component } from 'react';
import './App.css';
import Button from "@material-ui/core/Button"

class LoginAndInitGapi extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            gapiLoaded: false
        }
    }

    componentDidMount() {
        const gapiScript = document.createElement('script')
        gapiScript.src = 'https://apis.google.com/js/api.js?onload=onGapiLoad'
        window.onGapiLoad = () => {

            const onAuthApiLoad = () => {
                window.gapi.client.init({
                    'apiKey': 'AIzaSyAtf6e952e74ZjumuoHE0sQZRsv8bvOMoI',
                    'discoveryDocs': ["https://slides.googleapis.com/$discovery/rest?version=v1"],
                    'clientId': '427996423082-8j6vg3vos6bc6erkg6at45aotllu713n.apps.googleusercontent.com',
                    'scope': 'https://www.googleapis.com/auth/presentations'
                }).then(GoogleAuth => {
                    window.gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => this.signInResult(isSignedIn));
                    this.signInResult(window.gapi.auth2.getAuthInstance().isSignedIn.get());
                });
                this.setState({
                    gpaiLoaded: true
                })
            }

            window.gapi.load('client', {'callback': onAuthApiLoad})

        }
        document.body.appendChild(gapiScript)
    }

    signIn() {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    logout() {
        window.gapi.auth2.getAuthInstance().signOut();
    }

    signInResult(isSignIn) {
        this.setState({
            isSigned: isSignIn
        })
    }

    render() {
        if (!this.state.gpaiLoaded) {
            return <div>Loading</div>
        }

        if (this.state.isSigned) {
            return <div>
                <Button onClick={e => this.logout()}>
                    Logout
                </Button>
                {this.props.children}
            </div>
        }

        return (
            <div className="App">
                <Button onClick={e => this.signIn()}>
                    Sign in
                </Button>
            </div>
        );

    }
}

export default LoginAndInitGapi;
