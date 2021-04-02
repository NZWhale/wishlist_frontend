import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import AuthorisePage from "./components/AuthorisePage";
import RegistrationPage from "./components/RegistrationPage";

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
                </Switch>
            </Router>
        )
    }
}

export default App;
