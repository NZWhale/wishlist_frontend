import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import AuthorisePage from "./components/AuthorisePage";
import RegistrationPage from "./components/RegistrationPage";
import AccountPage from "./components/AccountPage"

class App extends React.Component {
    render() {
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
                    <Redirect from='/' to='/registration'/>
                </Switch>
            </Router>
        )
    }
}

export default App;
