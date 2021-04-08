import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Cookies from 'js-cookie'
import AuthorisePage from "./components/AuthorisePage";
import RegistrationPage from "./components/RegistrationPage";
import AccountPage from "./components/AccountPage"
import PublicPage from "./components/PublicPage";

class App extends React.Component {
    state = {
        cookie: Cookies.get('auth-token')
    }
    render() {
        const {cookie} = this.state
        return (
            <Router>
                <Switch>
                    <Route path="/registration">
                        <RegistrationPage/>
                    </Route>
                    <Route path="/authorise">
                        <AuthorisePage/>
                    </Route>
                    <Route path="/account">
                        <AccountPage/>
                    </Route>
                    <Route path="/user/:username">
                        <PublicPage/>
                    </Route>
                    <Redirect from='/' to={cookie?'/account':'/registration'}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
