import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router, } from "react-router-dom"
import FillMySlidesApp from "./fillmyslides/FillMySlidesApp"
import HomePage from "./HomePage"
import CssBaseline from "@material-ui/core/CssBaseline"
import Header from "./layout/Header"
import Footer from "./Footer"
import PrivacyRules from "./PrivacyPolicy"

class App extends Component {

    render() {
        return (
            <Router>
                <CssBaseline/>
                <Header/>
                <div>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/app/" component={FillMySlidesApp} />
                        <Route path="/privacy" component={PrivacyRules} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </div>
                <Footer/>
            </Router>
        );
    }
}

export default (App);
